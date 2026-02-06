'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Types temporaires en attendant la génération des types Supabase
type CVAnalysis = {
  id: string
  status: string
  file_name?: string
  created_at: string
  [key: string]: unknown
}

type CVResults = {
  id: string
  analysis_id: string
  score_global: number
  scores: Record<string, number>
  diagnostic: Record<string, string>
  forces: string[]
  faiblesses: string[]
  recommandations: Array<string | { titre: string; description: string; impact?: string; priorite?: string }>
  [key: string]: unknown
}

type PipelineStep = 'pending' | 'extracting' | 'anonymizing' | 'analyzing' | 'deanonymizing' | 'done' | 'error'

export default function CVAnalysisPage() {
  const { id } = useParams<{ id: string }>()
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null)
  const [results, setResults] = useState<CVResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<PipelineStep>('pending')
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // Utiliser l'API route pour bypass RLS
        const res = await fetch(`/api/cv/${id}`)
        if (!res.ok) {
          console.error('Failed to load analysis')
          setLoading(false)
          return
        }
        
        const { analysis: analysisData, results: resultsData } = await res.json()
        
        if (analysisData) {
          setAnalysis(analysisData)
          setStep(analysisData.status as PipelineStep)
          
          if (resultsData) {
            setResults(resultsData)
          }
        }
      } catch (err) {
        console.error('Error loading analysis:', err)
      }
      setLoading(false)
    }

    fetchAnalysis()
  }, [id])

  // Ref pour éviter les doubles exécutions du pipeline
  const pipelineStarted = useRef(false)

  // 1. POLLING : Met à jour l'UI toutes les 2 secondes
  useEffect(() => {
    if (!analysis || loading) return
    if (step === 'done' || step === 'error') return

    const pollStatus = async () => {
      try {
        const res = await fetch(`/api/cv/${id}`)
        if (!res.ok) return
        
        const { analysis: data, results: resultsData } = await res.json()
        if (data && data.status !== step) {
          console.log(`[Poll] Status changed: ${step} → ${data.status}`)
          setStep(data.status as PipelineStep)
          
          if (data.status === 'done' && resultsData) {
            setResults(resultsData)
          }
        }
      } catch (err) {
        console.error('[Poll] Error:', err)
      }
    }

    // Poll immédiatement puis toutes les 2 secondes
    const interval = setInterval(pollStatus, 2000)
    
    return () => clearInterval(interval)
  }, [analysis, loading, step, id])

  // 2. PIPELINE : Lance les étapes en background (fire & forget)
  useEffect(() => {
    if (!analysis || loading) return
    if (step !== 'pending') return  // Ne lancer que si pending
    if (pipelineStarted.current) return
    
    pipelineStarted.current = true
    console.log('[Pipeline] Starting...')

    const runPipeline = async () => {
      try {
        // Étape 1 : Extraction
        console.log('[Pipeline] Step 1: Extract')
        const res1 = await fetch('/api/cv/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysisId: id }),
        })
        if (!res1.ok) throw new Error('Erreur extraction')

        // Étape 2 : Anonymisation  
        console.log('[Pipeline] Step 2: Anonymize')
        const res2 = await fetch('/api/cv/anonymize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysisId: id }),
        })
        if (!res2.ok) throw new Error('Erreur anonymisation')

        // Étape 3 : Analyse
        console.log('[Pipeline] Step 3: Analyze')
        const res3 = await fetch('/api/cv/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysisId: id }),
        })
        if (!res3.ok) throw new Error('Erreur analyse')

        console.log('[Pipeline] Done!')
      } catch (err) {
        console.error('[Pipeline] Error:', err)
        setError(err instanceof Error ? err.message : 'Erreur')
        setStep('error')
      }
    }

    // Fire & forget - le polling s'occupera de l'UI
    runPipeline()
  }, [analysis, loading, step, id])

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
                  Uploadé le {analysis?.created_at ? new Date(analysis.created_at).toLocaleString('fr-FR') : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          {step !== 'done' && (
            <div style={{
              padding: '1.5rem',
              backgroundColor: step === 'error' ? '#FEE2E2' : '#FEF9C3',
              border: `1px solid ${step === 'error' ? '#FCA5A5' : '#FDE047'}`,
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {step !== 'error' && (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #CA8A04',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                )}
                <div>
                  <div style={{ 
                    fontWeight: 600, 
                    color: step === 'error' ? '#991B1B' : '#854D0E' 
                  }}>
                    {step === 'pending' && 'Extraction du PDF...'}
                    {step === 'extracting' && 'Extraction en cours...'}
                    {step === 'anonymizing' && 'Anonymisation RGPD...'}
                    {step === 'analyzing' && 'Analyse IA (DeepSeek)...'}
                    {step === 'deanonymizing' && 'Finalisation...'}
                    {step === 'error' && `❌ ${error || 'Erreur lors de l\'analyse'}`}
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: step === 'error' ? '#B91C1C' : '#A16207', 
                    marginTop: '0.25rem' 
                  }}>
                    {step === 'error' 
                      ? 'Veuillez réessayer.'
                      : 'Veuillez patienter...'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'done' && results && (
            <>
              {/* Score Global */}
              <div style={{
                padding: '2rem',
                backgroundColor: '#DCFCE7',
                border: '1px solid #86EFAC',
                borderRadius: '12px',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#15803D', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>
                  Score Global
                </div>
                <div style={{ fontSize: '4rem', fontWeight: 700, color: '#166534' }}>
                  {results.score_global}
                </div>
                <div style={{ fontSize: '1rem', color: '#15803D' }}>
                  / 100
                </div>
              </div>

              {/* Diagnostic */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>MÉTIER</div>
                  <div style={{ fontWeight: 600 }}>{results.diagnostic.metier}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>SECTEUR</div>
                  <div style={{ fontWeight: 600 }}>{results.diagnostic.secteur}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>NIVEAU</div>
                  <div style={{ fontWeight: 600 }}>{results.diagnostic.niveau}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>EXPÉRIENCE</div>
                  <div style={{ fontWeight: 600 }}>{results.diagnostic.experience}</div>
                </div>
              </div>

              {/* Scores détaillés */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Analyse détaillée</h3>
                {Object.entries(results.scores).map(([key, value]: [string, any]) => (
                  <div key={key} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ textTransform: 'capitalize' }}>{key}</span>
                      <span style={{ fontWeight: 600, color: value >= 70 ? '#16A34A' : value >= 50 ? '#EAB308' : '#DC2626' }}>
                        {value}
                      </span>
                    </div>
                    <div style={{ 
                      height: '8px', 
                      backgroundColor: '#F3F4F6', 
                      borderRadius: '999px', 
                      overflow: 'hidden' 
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${value}%`,
                        backgroundColor: value >= 70 ? '#16A34A' : value >= 50 ? '#EAB308' : '#DC2626',
                        borderRadius: '999px',
                        transition: 'width 0.5s'
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Forces & Faiblesses */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: '#DCFCE7', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#166534' }}>✅ Points forts</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {results.forces.map((force: string, i: number) => (
                      <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.875rem', paddingLeft: '1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        {force}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: '1.5rem', backgroundColor: '#FEF9C3', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#854D0E' }}>⚠️ À améliorer</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {results.faiblesses.map((faiblesse: string, i: number) => (
                      <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.875rem', paddingLeft: '1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        {faiblesse}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommandations */}
              <div style={{ padding: '1.5rem', backgroundColor: '#DBEAFE', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#1E40AF' }}>💡 Plan d'action</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {results.recommandations.map((reco, i: number) => {
                    const text = typeof reco === 'string' ? reco : reco.titre || reco.description
                    return (
                      <li key={i} style={{ 
                        marginBottom: '0.75rem', 
                        fontSize: '0.875rem',
                        paddingLeft: '2rem',
                        position: 'relative'
                      }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: 0,
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#3B82F6',
                          color: '#FFF',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {i + 1}
                        </span>
                        {text}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )}

          {/* Next Steps */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Prochaines étapes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: ['anonymizing', 'analyzing', 'deanonymizing', 'done'].includes(step) ? '#0D9488' : '#E5E7EB',
                  color: ['anonymizing', 'analyzing', 'deanonymizing', 'done'].includes(step) ? '#FFFFFF' : '#6B7280',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>1</div>
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
                  backgroundColor: ['analyzing', 'deanonymizing', 'done'].includes(step) ? '#0D9488' : '#E5E7EB',
                  color: ['analyzing', 'deanonymizing', 'done'].includes(step) ? '#FFFFFF' : '#6B7280',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>2</div>
                <div>
                  <div style={{ fontWeight: 500 }}>Analyse IA</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Scoring BMAD via DeepSeek
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        {step !== 'done' && (
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#DBEAFE',
            border: '1px solid #93C5FD',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#1E40AF'
          }}>
            💡 <strong>Astuce :</strong> L'analyse se déroule en 3 étapes automatiques (15-30 secondes au total)
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
