'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SECTORS, type SectorId, type PortfolioWizardState } from '@/types/portfolio'

type WizardStep = 'sector' | 'profile' | 'import' | 'review'

const STEPS: { id: WizardStep; label: string }[] = [
  { id: 'sector', label: 'Secteur' },
  { id: 'profile', label: 'Profil' },
  { id: 'import', label: 'Import' },
  { id: 'review', label: 'Finaliser' },
]

export default function CreatePortfolioPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<WizardStep>('sector')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, setState] = useState<PortfolioWizardState>({
    step: 'sector',
    sector: null,
    title: '',
    tagline: '',
    importFromCV: false,
    cvAnalysisId: null,
  })

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep)

  const canProceed = () => {
    switch (currentStep) {
      case 'sector':
        return state.sector !== null
      case 'profile':
        return state.title.trim().length > 0
      case 'import':
        return true // Optional step
      case 'review':
        return true
      default:
        return false
    }
  }

  const handleNext = async () => {
    if (currentStep === 'review') {
      // Create portfolio
      setIsSubmitting(true)
      try {
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: state.title,
            tagline: state.tagline,
            sector: state.sector,
            cvAnalysisId: state.cvAnalysisId,
          }),
        })
        
        if (res.ok) {
          const { portfolio } = await res.json()
          router.push(`/portfolio/${portfolio.id}`)
        } else {
          alert('Erreur lors de la création')
        }
      } catch (err) {
        console.error(err)
        alert('Erreur lors de la création')
      }
      setIsSubmitting(false)
      return
    }

    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: index <= currentStepIndex ? '#0D9488' : '#9CA3AF',
                  fontSize: '0.875rem',
                  fontWeight: index === currentStepIndex ? 600 : 400
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: index <= currentStepIndex ? '#0D9488' : '#E5E7EB',
                  color: index <= currentStepIndex ? '#FFFFFF' : '#9CA3AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {index < currentStepIndex ? '✓' : index + 1}
                </div>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
            ))}
          </div>
          <div style={{
            height: '4px',
            backgroundColor: '#E5E7EB',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
              backgroundColor: '#0D9488',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>
          {/* Step 1: Sector */}
          {currentStep === 'sector' && (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Quel est votre secteur ?
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Cela nous aidera à personnaliser votre portfolio
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '0.75rem'
              }}>
                {SECTORS.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setState({ ...state, sector: sector.id as SectorId })}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: state.sector === sector.id
                        ? `2px solid ${sector.color}`
                        : '2px solid #E5E7EB',
                      backgroundColor: state.sector === sector.id
                        ? `${sector.color}10`
                        : '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                      {sector.icon}
                    </div>
                    <div style={{
                      fontSize: '0.813rem',
                      fontWeight: 500,
                      color: state.sector === sector.id ? sector.color : '#374151'
                    }}>
                      {sector.label}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Profile */}
          {currentStep === 'profile' && (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Présentez-vous
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Ces informations apparaîtront sur votre portfolio
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                  }}>
                    Titre du portfolio *
                  </label>
                  <input
                    type="text"
                    value={state.title}
                    onChange={(e) => setState({ ...state, title: e.target.value })}
                    placeholder="Ex: Jean Dupont - Développeur Full Stack"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                  }}>
                    Tagline (optionnel)
                  </label>
                  <input
                    type="text"
                    value={state.tagline}
                    onChange={(e) => setState({ ...state, tagline: e.target.value })}
                    placeholder="Ex: 5 ans d'expérience en React & Node.js"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 3: Import */}
          {currentStep === 'import' && (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Importer depuis un CV ?
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Gagnez du temps en important les données d'une analyse CV existante
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={() => setState({ ...state, importFromCV: false })}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: !state.importFromCV ? '2px solid #0D9488' : '2px solid #E5E7EB',
                    backgroundColor: !state.importFromCV ? '#F0FDFA' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                    🆕 Commencer de zéro
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Créer un portfolio vide et ajouter mes réalisations manuellement
                  </div>
                </button>
                <button
                  onClick={() => setState({ ...state, importFromCV: true })}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: state.importFromCV ? '2px solid #0D9488' : '2px solid #E5E7EB',
                    backgroundColor: state.importFromCV ? '#F0FDFA' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                    📄 Importer depuis mon CV
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Pré-remplir avec les compétences et expériences détectées
                  </div>
                </button>
              </div>
              {state.importFromCV && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#FEF9C3',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#92400E'
                }}>
                  💡 Vous pourrez sélectionner une analyse CV après la création du portfolio
                </div>
              )}
            </>
          )}

          {/* Step 4: Review */}
          {currentStep === 'review' && (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Récapitulatif
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Vérifiez les informations avant de créer votre portfolio
              </p>
              <div style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                    TITRE
                  </div>
                  <div style={{ fontWeight: 600 }}>{state.title}</div>
                </div>
                {state.tagline && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                      TAGLINE
                    </div>
                    <div>{state.tagline}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                    SECTEUR
                  </div>
                  <div>
                    {SECTORS.find(s => s.id === state.sector)?.icon}{' '}
                    {SECTORS.find(s => s.id === state.sector)?.label}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                    IMPORT CV
                  </div>
                  <div>{state.importFromCV ? 'Oui' : 'Non'}</div>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E5E7EB'
          }}>
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStepIndex === 0 ? 0.5 : 1
              }}
            >
              Retour
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: canProceed() ? '#0D9488' : '#E5E7EB',
                color: canProceed() ? '#FFFFFF' : '#9CA3AF',
                cursor: canProceed() && !isSubmitting ? 'pointer' : 'not-allowed',
                fontWeight: 500
              }}
            >
              {isSubmitting ? 'Création...' : currentStep === 'review' ? 'Créer le portfolio' : 'Continuer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
