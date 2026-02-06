'use client'

import { useState } from 'react'
import type { SkillCategory } from '@/types/portfolio'

interface AddSkillModalProps {
  portfolioId: string
  onClose: () => void
  onSuccess: (skill: any) => void
}

const CATEGORIES: { id: SkillCategory; label: string; description: string }[] = [
  { id: 'hard', label: 'Technique', description: 'Compétences techniques (code, outils, etc.)' },
  { id: 'soft', label: 'Soft skill', description: 'Compétences comportementales' },
  { id: 'tool', label: 'Outil', description: 'Logiciels et outils maîtrisés' },
  { id: 'language', label: 'Langue', description: 'Langues parlées' },
]

export function AddSkillModal({ portfolioId, onClose, onSuccess }: AddSkillModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'hard' as SkillCategory,
    level: 3,
    years_experience: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/portfolio/${portfolioId}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          years_experience: formData.years_experience ? parseFloat(formData.years_experience) : null,
        }),
      })

      if (res.ok) {
        const { skill } = await res.json()
        onSuccess(skill)
        onClose()
      } else {
        alert('Erreur lors de la création')
      }
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la création')
    }
    setIsSubmitting(false)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
            Ajouter une compétence
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F3F4F6',
              cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Nom de la compétence *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: React, Gestion de projet, Anglais..."
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Catégorie
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: formData.category === cat.id ? '2px solid #0D9488' : '1px solid #E5E7EB',
                      backgroundColor: formData.category === cat.id ? '#F0FDFA' : '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{cat.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Niveau de maîtrise
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '8px',
                  fontWeight: 600,
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {formData.level}/5
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#9CA3AF',
                marginTop: '0.25rem'
              }}>
                <span>Débutant</span>
                <span>Intermédiaire</span>
                <span>Expert</span>
              </div>
            </div>

            {/* Years */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Années d'expérience (optionnel)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="50"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                placeholder="Ex: 3.5"
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

          {/* Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E5E7EB'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: formData.name.trim() ? '#0D9488' : '#E5E7EB',
                color: formData.name.trim() ? '#FFFFFF' : '#9CA3AF',
                cursor: formData.name.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
                fontWeight: 500
              }}
            >
              {isSubmitting ? 'Création...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
