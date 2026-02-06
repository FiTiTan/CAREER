'use client';

// ============================================================
// Step 3 : Contact (Email, téléphone, adresse)
// ============================================================

import type { PortfolioFormData } from '@/lib/portfolio/types';

interface Step3Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step3Contact({ formData, updateFormData }: Step3Props) {
  return (
    <div className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Email <span className="text-error">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="contact@example.com"
          required
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="+33 6 12 34 56 78"
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
        />
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Adresse (optionnel)
        </label>
        <p className="text-sm text-text-tertiary mb-3">
          {formData.profileType === 'place' 
            ? 'Recommandé pour un lieu physique'
            : 'Utile si vous recevez des clients'}
        </p>
        <textarea
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          placeholder="42 rue de la République, 75001 Paris"
          rows={2}
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Horaires d'ouverture */}
      {formData.profileType === 'place' && (
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
            Horaires d'ouverture (optionnel)
          </label>
          <textarea
            value={formData.openingHours}
            onChange={(e) => updateFormData({ openingHours: e.target.value })}
            placeholder="Lun-Ven : 9h-18h&#10;Sam : 10h-13h&#10;Dim : Fermé"
            rows={3}
            className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors resize-none"
          />
        </div>
      )}
    </div>
  );
}
