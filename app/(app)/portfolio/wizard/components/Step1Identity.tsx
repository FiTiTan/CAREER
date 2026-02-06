'use client';

// ============================================================
// Step 1 : Identité (Personne ou Lieu + infos de base)
// ============================================================

import { useState, useEffect } from 'react';
import type { PortfolioFormData, ProfileType } from '@/lib/portfolio/types';
import { detectProfileContext } from '@/lib/portfolio/profileContext';

interface Step1Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step1Identity({ formData, updateFormData }: Step1Props) {
  const handleProfileTypeChange = (type: ProfileType) => {
    updateFormData({ profileType: type });
  };

  const handleTitleChange = (title: string) => {
    updateFormData({ title });
    
    // Détection automatique du contexte
    if (title.length > 3 && formData.profileType) {
      const detection = detectProfileContext(title, formData.profileType === 'place');
      updateFormData({ profileContext: detection.context });
    }
  };

  return (
    <div className="space-y-6">
      {/* Type de profil */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
          Type de profil
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleProfileTypeChange('person')}
            className={`
              p-6 rounded-xl border-2 transition-all text-left
              ${
                formData.profileType === 'person'
                  ? 'border-[var(--accent-teal)] bg-[var(--accent-teal-bg)]'
                  : 'border-[var(--border-default)] hover:border-[var(--accent-teal)]'
              }
            `}
          >
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold text-text-primary mb-1">Personne</div>
            <div className="text-sm text-text-tertiary">Freelance, indépendant, professionnel</div>
          </button>

          <button
            type="button"
            onClick={() => handleProfileTypeChange('place')}
            className={`
              p-6 rounded-xl border-2 transition-all text-left
              ${
                formData.profileType === 'place'
                  ? 'border-[var(--accent-teal)] bg-[var(--accent-teal-bg)]'
                  : 'border-[var(--border-default)] hover:border-[var(--accent-teal)]'
              }
            `}
          >
            <div className="text-3xl mb-2">📍</div>
            <div className="font-semibold text-text-primary mb-1">Lieu</div>
            <div className="text-sm text-text-tertiary">Restaurant, boutique, cabinet...</div>
          </button>
        </div>
      </div>

      {/* Nom */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          {formData.profileType === 'place' ? 'Nom du lieu' : 'Votre nom'}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder={formData.profileType === 'place' ? 'Le Café des Arts' : 'Marie Dupont'}
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
        />
      </div>

      {/* Métier / Activité */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          {formData.profileType === 'place' ? 'Type d\'établissement' : 'Votre métier'}
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder={formData.profileType === 'place' ? 'Restaurant gastronomique' : 'Développeur Full-Stack'}
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
        />
        {formData.profileContext && (
          <div className="mt-2 text-xs text-text-tertiary">
            Contexte détecté : <span className="capitalize font-medium">{formData.profileContext}</span>
          </div>
        )}
      </div>

      {/* Slogan / Accroche */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Slogan / Accroche
        </label>
        <input
          type="text"
          value={formData.tagline}
          onChange={(e) => updateFormData({ tagline: e.target.value })}
          placeholder="Une phrase qui vous décrit en quelques mots"
          maxLength={150}
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
        />
        <div className="mt-1 text-xs text-text-tertiary text-right">
          {formData.tagline.length}/150
        </div>
      </div>

      {/* 3 Expertises */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          3 Expertises / Spécialités
        </label>
        <div className="space-y-3">
          {formData.expertises.map((expertise, index) => (
            <input
              key={index}
              type="text"
              value={expertise}
              onChange={(e) => {
                const newExpertises = [...formData.expertises];
                newExpertises[index] = e.target.value;
                updateFormData({ expertises: newExpertises });
              }}
              placeholder={`Expertise ${index + 1}`}
              className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Ce qui différencie */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Ce qui vous différencie (optionnel)
        </label>
        <textarea
          value={formData.differentiation}
          onChange={(e) => updateFormData({ differentiation: e.target.value })}
          placeholder="Qu'est-ce qui vous rend unique ?"
          rows={3}
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}
