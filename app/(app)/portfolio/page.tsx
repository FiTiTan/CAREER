'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Portfolio } from '@/types/portfolio'
import { SECTORS } from '@/types/portfolio'

export default function PortfolioDashboard() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch('/api/portfolio')
        if (res.ok) {
          const data = await res.json()
          setPortfolios(data.portfolios || [])
        }
      } catch (err) {
        console.error('Error fetching portfolios:', err)
      }
      setLoading(false)
    }
    fetchPortfolios()
  }, [])

  const getSectorInfo = (sectorId: string | null) => {
    return SECTORS.find(s => s.id === sectorId) || SECTORS[SECTORS.length - 1]
  }

  if (loading) {
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

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#FAFAFA'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Mon Portfolio Maître
            </h1>
            <p style={{ color: '#6B7280' }}>
              Centralisez vos réalisations et générez des portfolios ciblés
            </p>
          </div>
          <Link
            href="/portfolio/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0D9488',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Créer un portfolio
          </Link>
        </div>

        {/* Empty State */}
        {portfolios.length === 0 && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '2px dashed #E5E7EB'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              backgroundColor: '#F0FDFA',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Créez votre premier portfolio
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Rassemblez vos projets, compétences et certifications en un seul endroit.
              Générez ensuite des portfolios ciblés pour chaque candidature.
            </p>
            <Link
              href="/portfolio/new"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0D9488',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Commencer
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* Portfolio Grid */}
        {portfolios.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {portfolios.map((portfolio) => {
              const sector = getSectorInfo(portfolio.sector)
              return (
                <Link
                  key={portfolio.id}
                  href={`/portfolio/${portfolio.id}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid #E5E7EB',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    display: 'block'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: `${sector.color}15`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      {sector.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>
                          {portfolio.title}
                        </h3>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '999px',
                          backgroundColor: portfolio.status === 'published' ? '#DCFCE7' : '#FEF3C7',
                          color: portfolio.status === 'published' ? '#166534' : '#92400E'
                        }}>
                          {portfolio.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                      {portfolio.tagline && (
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6B7280',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {portfolio.tagline}
                        </p>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.75rem',
                        fontSize: '0.75rem',
                        color: '#9CA3AF'
                      }}>
                        <span style={{ color: sector.color }}>{sector.label}</span>
                        <span>•</span>
                        <span>
                          Modifié {new Date(portfolio.updated_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Quick Stats */}
        {portfolios.length > 0 && (
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Conseil
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
              💡 <strong>Astuce :</strong> Enrichissez votre portfolio maître avec vos meilleures réalisations.
              Vous pourrez ensuite générer des portfolios ciblés adaptés à chaque offre d'emploi.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
