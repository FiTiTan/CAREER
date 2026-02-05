import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Get current user (if authenticated)
    const { data: { user } } = await supabase.auth.getUser()

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = `uploads/${filename}`

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(filePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    // Create analysis record
    const { data: analysis, error: dbError } = await supabase
      .from('cv_analyses')
      .insert({
        user_id: user?.id || null,
        file_path: filePath,
        file_name: file.name,
        status: 'pending'
      })
      .select('id')
      .single()

    if (dbError || !analysis) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to create analysis' }, { status: 500 })
    }

    return NextResponse.json({ 
      analysisId: analysis.id,
      message: 'Upload successful' 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
