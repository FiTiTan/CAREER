'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function CVUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFile = async (file: File) => {
    // Validation
    if (!file.type.includes('pdf')) {
      setError('Seuls les fichiers PDF sont acceptés')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('Le fichier ne doit pas dépasser 5 MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Upload le PDF
      const formData = new FormData()
      formData.append('cv', file)

      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Échec de l\'upload')
      }

      const { id } = await response.json()
      
      // Redirect to analysis page
      router.push(`/cv/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setUploading(false)
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${isDragging ? '#0D9488' : '#D1D5DB'}`,
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center',
        backgroundColor: isDragging ? '#F0FDFA' : '#FFFFFF',
        transition: 'all 0.2s',
        cursor: uploading ? 'not-allowed' : 'pointer'
      }}
    >
      {/* Icon */}
      <div style={{ 
        width: '64px', 
        height: '64px', 
        margin: '0 auto 1.5rem',
        color: '#0D9488'
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8m8 4H8m2-8H8"/>
        </svg>
      </div>

      {uploading ? (
        <>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Upload en cours...
          </h3>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '1rem auto',
            border: '3px solid #E5E7EB',
            borderTop: '3px solid #0D9488',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </>
      ) : (
        <>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Déposez votre CV ici
          </h3>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
            PDF uniquement · 5 MB max · Gratuit
          </p>

          <label style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1F2937'}
          >
            Choisir un fichier
            <input
              type="file"
              accept=".pdf"
              onChange={onFileSelect}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </>
      )}

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          borderRadius: '8px',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
