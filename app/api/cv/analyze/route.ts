import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { extractTextFromPDF } from '@/lib/pdf'
import { anonymizeCV } from '@/lib/ai/mistral'
import { analyzeCV } from '@/lib/ai/deepseek'

export async function POST(request: Request) {
  try {
    const { analysisId } = await request.json()

    if (!analysisId) {
      return NextResponse.json({ error: 'Missing analysisId' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Get analysis record
    const { data: analysis, error: fetchError } = await supabase
      .from('cv_analyses')
      .select('*')
      .eq('id', analysisId)
      .single()

    if (fetchError || !analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
    }

    // Update status to extracting
    await supabase
      .from('cv_analyses')
      .update({ status: 'extracting' })
      .eq('id', analysisId)

    // 2. Download PDF from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('cvs')
      .download(analysis.file_path)

    if (downloadError || !fileData) {
      await supabase
        .from('cv_analyses')
        .update({ status: 'error' })
        .eq('id', analysisId)
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
    }

    // 3. Extract text from PDF
    const buffer = await fileData.arrayBuffer()
    const rawText = await extractTextFromPDF(buffer)

    await supabase
      .from('cv_analyses')
      .update({ 
        raw_text: rawText,
        status: 'anonymizing' 
      })
      .eq('id', analysisId)

    // 4. Anonymize with Mistral
    const { anonymizedText, anonymizationMap } = await anonymizeCV(rawText)

    await supabase
      .from('cv_analyses')
      .update({ 
        anonymized_text: anonymizedText,
        anonymization_map: anonymizationMap,
        status: 'analyzing' 
      })
      .eq('id', analysisId)

    // 5. Analyze with DeepSeek
    const analysisResult = await analyzeCV(anonymizedText)

    // 6. Save results to database
    await supabase
      .from('cv_results')
      .insert({
        analysis_id: analysisId,
        score_global: analysisResult.score_global,
        scores: analysisResult.scores,
        diagnostic: analysisResult.diagnostic,
        forces: analysisResult.forces,
        faiblesses: analysisResult.faiblesses,
        recommandations: analysisResult.recommandations,
        raw_response: analysisResult
      })

    // 7. Mark as done
    await supabase
      .from('cv_analyses')
      .update({ status: 'done' })
      .eq('id', analysisId)

    return NextResponse.json({ 
      success: true,
      message: 'Analysis completed successfully'
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 })
  }
}
