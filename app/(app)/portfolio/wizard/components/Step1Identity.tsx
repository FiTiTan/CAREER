'use client';

// ============================================================
// Step 1 : Identité (Personne ou Entreprise)
// - Personne : Nom, Métier, Réseaux sociaux (pills)
// - Entreprise : Nom, Type, Adresse, Horaires
// ============================================================

import React, { useState } from 'react';
import type { PortfolioFormData, ProfileType, SocialPlatform } from '@/lib/portfolio/types';

interface Step1Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

// Réseaux sociaux avec icônes SVG officielles
const SOCIAL_NETWORKS: { id: SocialPlatform; name: string; color: string; icon: React.ReactNode }[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E4405F',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    color: '#181717',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    id: 'behance',
    name: 'Behance',
    color: '#1769FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.77c.543 0 .97-.138 1.28-.415.31-.28.465-.65.465-1.12 0-.28-.05-.51-.152-.69-.1-.18-.24-.32-.42-.42-.18-.1-.38-.17-.59-.21-.21-.04-.43-.06-.64-.06H2.99v2.91h3.56l-.005.005zm.214 5.46c.247 0 .487-.03.72-.09.23-.06.448-.16.64-.29.19-.13.35-.3.48-.52.124-.22.19-.5.19-.84 0-.67-.2-1.14-.59-1.41-.393-.27-.88-.41-1.467-.41h-3.74v3.54h3.76l.007.02zM21.69 16.97c-.64.58-1.59.88-2.86.88-.63 0-1.2-.09-1.73-.29-.53-.19-.98-.46-1.36-.81-.38-.35-.67-.78-.88-1.27-.2-.49-.31-1.04-.31-1.64h2.5c.04.43.13.78.29 1.07.16.28.37.51.62.69.25.18.54.31.86.4.33.08.67.12 1.03.12.58 0 1.04-.12 1.37-.34.33-.23.5-.56.5-.99 0-.28-.08-.51-.23-.7-.15-.19-.36-.35-.62-.48-.26-.13-.56-.24-.91-.34-.35-.1-.72-.2-1.11-.3-.42-.11-.84-.23-1.25-.37-.4-.14-.77-.33-1.1-.57-.33-.24-.59-.55-.79-.92-.2-.37-.3-.83-.3-1.38 0-.58.12-1.09.35-1.51.23-.43.54-.78.94-1.07.39-.29.85-.5 1.36-.63.51-.14 1.05-.21 1.61-.21.56 0 1.1.07 1.6.21.5.14.93.36 1.31.65.38.29.68.66.9 1.1.23.45.36.97.41 1.58h-2.5c-.08-.52-.27-.9-.57-1.14-.3-.24-.73-.36-1.28-.36-.21 0-.42.02-.64.07-.21.05-.4.13-.56.24-.16.11-.29.26-.39.44-.1.18-.15.4-.15.67 0 .24.06.45.18.61.12.16.3.3.52.42.23.12.51.23.85.32.33.1.72.2 1.16.3.43.11.85.24 1.28.39.43.15.81.36 1.16.62.35.26.63.59.84 1 .21.4.32.9.32 1.5 0 .58-.12 1.1-.35 1.55-.24.45-.56.84-.97 1.15l.02-.04zM15.12 6.04h5.87V7.2h-5.87V6.04z"/>
      </svg>
    ),
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    color: '#EA4C89',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
      </svg>
    ),
  },
  {
    id: 'malt',
    name: 'Malt',
    color: '#FC5757',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.8H6.432c-.316 0-.576-.26-.576-.576V7.776c0-.316.26-.576.576-.576h11.136c.316 0 .576.26.576.576v8.448c0 .316-.26.576-.576.576z"/>
      </svg>
    ),
  },
];

export default function Step1Identity({ formData, updateFormData }: Step1Props) {
  const [showHours, setShowHours] = useState(formData.openingHours ? true : false);

  const handleProfileTypeChange = (type: ProfileType) => {
    updateFormData({ profileType: type });
  };

  const toggleSocialNetwork = (platform: SocialPlatform) => {
    const currentLinks = formData.socialLinks || [];
    const existingIndex = currentLinks.findIndex(link => link.platform === platform);
    
    if (existingIndex >= 0) {
      // Remove
      const newLinks = currentLinks.filter((_, i) => i !== existingIndex);
      updateFormData({ socialLinks: newLinks });
    } else {
      // Add
      updateFormData({ socialLinks: [...currentLinks, { platform, url: '' }] });
    }
  };

  const isSocialActive = (platform: SocialPlatform) => {
    return formData.socialLinks?.some(link => link.platform === platform) || false;
  };

  return (
    <div className="space-y-8">
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
                  ? 'border-accent bg-accent-muted'
                  : 'border-[var(--border-default)] hover:border-accent'
              }
            `}
          >
            <svg className="w-8 h-8 mb-2 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
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
                  ? 'border-accent bg-accent-muted'
                  : 'border-[var(--border-default)] hover:border-accent'
              }
            `}
          >
            <svg className="w-8 h-8 mb-2 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div className="font-semibold text-text-primary mb-1">Entreprise</div>
            <div className="text-sm text-text-tertiary">Restaurant, boutique, cabinet, association...</div>
          </button>
        </div>
      </div>

      {/* ========== PERSONNE ========== */}
      {formData.profileType === 'person' && (
        <>
          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Votre nom
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="Marie Dupont"
              className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Métier */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Votre métier
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              placeholder="Développeur Full-Stack, Designer UX, Coach..."
              className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Réseaux sociaux - Pills */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
              Vos réseaux sociaux
            </label>
            <p className="text-sm text-text-tertiary mb-4">
              Sélectionnez les réseaux à afficher sur votre portfolio
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_NETWORKS.map((network) => {
                const isActive = isSocialActive(network.id);
                return (
                  <button
                    key={network.id}
                    type="button"
                    onClick={() => toggleSocialNetwork(network.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all
                      ${isActive 
                        ? 'border-transparent text-white' 
                        : 'border-[var(--border-light)] text-text-tertiary hover:border-[var(--border-default)]'
                      }
                    `}
                    style={isActive ? { backgroundColor: network.color } : {}}
                  >
                    <span className={isActive ? 'text-white' : 'text-text-tertiary'}>
                      {network.icon}
                    </span>
                    <span className="text-sm font-medium">{network.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ========== ENTREPRISE ========== */}
      {formData.profileType === 'place' && (
        <>
          {/* Nom de l'entreprise */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="Le Café des Arts, Cabinet Martin, ..."
              className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Type d'établissement */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Type d'établissement
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              placeholder="Restaurant, Boutique, Cabinet notarial, Agence immobilière..."
              className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Adresse
            </label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => updateFormData({ address: e.target.value })}
              placeholder="123 rue de Paris, 75001 Paris"
              className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Horaires - Checkbox pour afficher */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showHours}
                onChange={(e) => {
                  setShowHours(e.target.checked);
                  if (!e.target.checked) {
                    updateFormData({ openingHours: '' });
                  }
                }}
                className="w-5 h-5 rounded border-[var(--border-default)] text-accent focus:ring-accent"
              />
              <span className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                Afficher les horaires d'ouverture
              </span>
            </label>
            
            {showHours && (
              <textarea
                value={formData.openingHours || ''}
                onChange={(e) => updateFormData({ openingHours: e.target.value })}
                placeholder="Lun-Ven : 9h-18h&#10;Sam : 10h-16h&#10;Dim : Fermé"
                rows={3}
                className="mt-3 w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors resize-none"
              />
            )}
          </div>

          {/* Réseaux sociaux - Pills (aussi pour entreprises) */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
              Réseaux sociaux de l'entreprise
            </label>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_NETWORKS.slice(0, 6).map((network) => {
                const isActive = isSocialActive(network.id);
                return (
                  <button
                    key={network.id}
                    type="button"
                    onClick={() => toggleSocialNetwork(network.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all
                      ${isActive 
                        ? 'border-transparent text-white' 
                        : 'border-[var(--border-light)] text-text-tertiary hover:border-[var(--border-default)]'
                      }
                    `}
                    style={isActive ? { backgroundColor: network.color } : {}}
                  >
                    <span className={isActive ? 'text-white' : 'text-text-tertiary'}>
                      {network.icon}
                    </span>
                    <span className="text-sm font-medium">{network.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Affichage des tips si détection faite avec confiance basse */}
      {formData.sectorConfidence !== undefined && formData.sectorConfidence < 0.7 && formData.sectorTips && formData.sectorTips.length > 0 && (
        <div className="bg-warning-bg border border-warning rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-text-primary mb-2">
                Conseils pour améliorer votre profil
              </h4>
              <ul className="text-sm text-text-secondary space-y-1">
                {formData.sectorTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-warning mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Affichage du secteur détecté si confiance élevée */}
      {formData.detectedSector && formData.sectorConfidence !== undefined && formData.sectorConfidence >= 0.7 && (
        <div className="bg-success-bg border border-success rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-text-primary mb-1">
                Secteur détecté : <span className="capitalize">{formData.detectedSector}</span>
              </h4>
              <p className="text-sm text-text-secondary">
                Confiance : {Math.round(formData.sectorConfidence * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
