'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CVAnalysisPage() {
  const params = useParams()
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchAnalysis = async () => {
      const { data, error } = await supabase
        .from('cv_analyses')
        .select('*')
        .eq('id', params.id)
        .single()

      if (data) setAnalysis(data)
      setLoading(false)
    }

    fetchAnalysis()
  }, [params.id])

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FAFAFA'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #0D9488',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Chargement...</h2>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '3rem 2rem',
      backgroundColor: '#FAFAFA'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
          {/* Success Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1rem',
              backgroundColor: '#DCFCE7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '32px', height: '32px', color: '#16A34A' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              CV reçu !
            </h1>
            <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
              Votre fichier a été uploadé avec succès
            </p>
          </div>

          {/* File Info */}
          <div style={{
            backgroundColor: '#F9FAFB',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <svg style={{ width: '40px', height: '40px', color: '#0D9488' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                <path d="M14 2v6h6"/>
                <path d="M16 13H8m8 4H8m2-8H8"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                  {analysis?.file_name || 'CV.pdf'}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Uploadé le {new Date(analysis?.created_at).toLocaleString('fr-FR')}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#FEF9C3',
            border: '1px solid #FDE047',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #CA8A04',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <div>
                <div style={{ fontWeight: 600, color: '#854D0E' }}>
                  Analyse en cours...
                </div>
                <div style={{ fontSize: '0.875rem', color: '#A16207', marginTop: '0.25rem' }}>
                  L'analyse IA de votre CV démarrera automatiquement
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Prochaines étapes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>1</div>
                <div>
                  <div style={{ fontWeight: 500 }}>Extraction du texte</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Lecture automatique de votre CV PDF
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#E5E7EB',
                  color: '#6B7280',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>2</div>
                <div>
                  <div style={{ fontWeight: 500 }}>Anonymisation (RGPD)</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Protection de vos données personnelles
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#E5E7EB',
                  color: '#6B7280',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>3</div>
                <div>
                  <div style={{ fontWeight: 500 }}>Analyse IA</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Scoring BMAD + recommandations personnalisées
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#DBEAFE',
          border: '1px solid #93C5FD',
          borderRadius: '12px',
          fontSize: '0.875rem',
          color: '#1E40AF'
        }}>
          💡 <strong>Astuce :</strong> Cette page se mettra à jour automatiquement une fois l'analyse terminée (≈30 secondes)
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
