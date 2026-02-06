'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { PortfolioFull, PortfolioProject, PortfolioSkill } from '@/types/portfolio'
import { SECTORS } from '@/types/portfolio'
import { AddProjectModal } from '@/components/portfolio/AddProjectModal'
import { AddSkillModal } from '@/components/portfolio/AddSkillModal'

type Tab = 'overview' | 'projects' | 'skills' | 'certifications' | 'education'

export default function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<PortfolioFull | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [showAddProject, setShowAddProject] = useState(false)
  const [showAddSkill, setShowAddSkill] = useState(false)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/portfolio/${id}`)
        if (res.ok) {
          const data = await res.json()
          setPortfolio(data.portfolio)
        } else {
          router.push('/portfolio')
        }
      } catch (err) {
        console.error('Error:', err)
        router.push('/portfolio')
      }
      setLoading(false)
    }
    fetchPortfolio()
  }, [id, router])

  const getSectorInfo = (sectorId: string | null) => {
    return SECTORS.find(s => s.id === sectorId) || SECTORS[SECTORS.length - 1]
  }

  if (loading || !portfolio) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #E5E7EB',
          borderTop: '4px solid #0D9488',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const sector = getSectorInfo(portfolio.sector)
  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'projects', label: 'Projets', count: portfolio.projects?.length || 0 },
    { id: 'skills', label: 'Compétences', count: portfolio.skills?.length || 0 },
    { id: 'certifications', label: 'Certifications', count: portfolio.certifications?.length || 0 },
    { id: 'education', label: 'Formation', count: portfolio.education?.length || 0 },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '1.5rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Link
              href="/portfolio"
              style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              Portfolios
            </Link>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <span style={{ fontSize: '0.875rem' }}>{portfolio.title}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: `${sector.color}15`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                {sector.icon}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
                    {portfolio.title}
                  </h1>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    backgroundColor: portfolio.status === 'published' ? '#DCFCE7' : '#FEF3C7',
                    color: portfolio.status === 'published' ? '#166534' : '#92400E'
                  }}>
                    {portfolio.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
                {portfolio.tagline && (
                  <p style={{ color: '#6B7280', margin: '0.25rem 0 0' }}>
                    {portfolio.tagline}
                  </p>
                )}
                <p style={{ color: sector.color, fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
                  {sector.label}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {/* TODO: Preview */}}
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Aperçu
              </button>
              <button
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Exporter
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1.5rem',
            borderBottom: '1px solid #E5E7EB',
            marginLeft: '-2rem',
            marginRight: '-2rem',
            paddingLeft: '2rem',
            paddingRight: '2rem'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1rem',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#0D9488' : '#6B7280',
                  borderBottom: activeTab === tab.id ? '2px solid #0D9488' : '2px solid transparent',
                  marginBottom: '-1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span style={{
                    backgroundColor: activeTab === tab.id ? '#0D948815' : '#F3F4F6',
                    color: activeTab === tab.id ? '#0D9488' : '#6B7280',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Stats */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #E5E7EB'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                Statistiques
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0D9488' }}>
                    {portfolio.projects?.length || 0}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Projets</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0D9488' }}>
                    {portfolio.skills?.length || 0}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Compétences</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0D9488' }}>
                    {portfolio.certifications?.length || 0}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Certifications</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0D9488' }}>
                    {portfolio.testimonials?.length || 0}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Témoignages</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #E5E7EB'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                Actions rapides
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => { setActiveTab('projects'); setShowAddProject(true); }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>📁</span>
                  <div>
                    <div style={{ fontWeight: 500 }}>Ajouter un projet</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      Documentez une réalisation professionnelle
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => { setActiveTab('skills'); setShowAddSkill(true); }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>⚡</span>
                  <div>
                    <div style={{ fontWeight: 500 }}>Ajouter une compétence</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      Listez vos savoir-faire techniques et soft skills
                    </div>
                  </div>
                </button>
                <button
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>📄</span>
                  <div>
                    <div style={{ fontWeight: 500 }}>Importer depuis CV</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      Pré-remplir depuis une analyse CareerCare
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Projets & Réalisations</h2>
              <button
                onClick={() => setShowAddProject(true)}
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Ajouter un projet
              </button>
            </div>

            {(!portfolio.projects || portfolio.projects.length === 0) ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                border: '2px dashed #E5E7EB'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Aucun projet pour l'instant
                </h3>
                <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                  Ajoutez vos réalisations professionnelles pour enrichir votre portfolio
                </p>
                <button
                  onClick={() => setShowAddProject(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0D9488',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Ajouter mon premier projet
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {portfolio.projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {project.title}
                        </h3>
                        {project.company && (
                          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
                            {project.role} @ {project.company}
                          </p>
                        )}
                      </div>
                      <button style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </div>
                    {project.description && (
                      <p style={{ color: '#6B7280', marginTop: '0.75rem', fontSize: '0.875rem' }}>
                        {project.description}
                      </p>
                    )}
                    {project.skills && project.skills.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                        {project.skills.map((skill, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '999px',
                              backgroundColor: '#F3F4F6',
                              fontSize: '0.75rem'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Compétences</h2>
              <button
                onClick={() => setShowAddSkill(true)}
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Ajouter une compétence
              </button>
            </div>

            {(!portfolio.skills || portfolio.skills.length === 0) ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                border: '2px dashed #E5E7EB'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Aucune compétence ajoutée
                </h3>
                <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                  Listez vos compétences techniques et soft skills
                </p>
                <button
                  onClick={() => setShowAddSkill(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0D9488',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Ajouter une compétence
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {portfolio.skills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '1rem',
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500 }}>{skill.name}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '999px',
                        backgroundColor: skill.category === 'hard' ? '#DBEAFE' : '#FCE7F3',
                        color: skill.category === 'hard' ? '#1E40AF' : '#BE185D'
                      }}>
                        {skill.category === 'hard' ? 'Technique' : 'Soft skill'}
                      </span>
                    </div>
                    <div style={{ marginTop: '0.75rem' }}>
                      <div style={{
                        height: '6px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${(skill.level / 5) * 100}%`,
                          backgroundColor: '#0D9488',
                          borderRadius: '3px'
                        }} />
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.25rem',
                        fontSize: '0.75rem',
                        color: '#9CA3AF'
                      }}>
                        <span>Niveau {skill.level}/5</span>
                        {skill.years_experience && (
                          <span>{skill.years_experience} ans</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            border: '2px dashed #E5E7EB'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Certifications à venir
            </h3>
            <p style={{ color: '#6B7280' }}>
              Cette fonctionnalité sera bientôt disponible
            </p>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            border: '2px dashed #E5E7EB'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Formation à venir
            </h3>
            <p style={{ color: '#6B7280' }}>
              Cette fonctionnalité sera bientôt disponible
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddProject && (
        <AddProjectModal
          portfolioId={id}
          onClose={() => setShowAddProject(false)}
          onSuccess={(project) => {
            setPortfolio(prev => prev ? {
              ...prev,
              projects: [...(prev.projects || []), project]
            } : null)
          }}
        />
      )}

      {showAddSkill && (
        <AddSkillModal
          portfolioId={id}
          onClose={() => setShowAddSkill(false)}
          onSuccess={(skill) => {
            setPortfolio(prev => prev ? {
              ...prev,
              skills: [...(prev.skills || []), skill]
            } : null)
          }}
        />
      )}
    </div>
  )
}
