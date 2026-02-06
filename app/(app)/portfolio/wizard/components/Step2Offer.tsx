'use client';

// ============================================================
// Step 2 : Offre (Services / Spécialités)
// ============================================================

import type { PortfolioFormData } from '@/lib/portfolio/types';
import { getServicesLabel } from '@/lib/portfolio/labels';

interface Step2Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step2Offer({ formData, updateFormData }: Step2Props) {
  const servicesLabel = getServicesLabel(formData.profileContext);

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    updateFormData({ services: newServices });
  };

  const addService = () => {
    updateFormData({ services: [...formData.services, ''] });
  };

  const removeService = (index: number) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    updateFormData({ services: newServices });
  };

  return (
    <div className="space-y-6">
      {/* Services */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
          {servicesLabel} (minimum 3)
        </label>
        <div className="space-y-3">
          {formData.services.map((service, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                placeholder={`Service ${index + 1}`}
                className="flex-1 px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
              />
              {formData.services.length > 3 && (
                <button
                  onClick={() => removeService(index)}
                  className="px-3 text-text-tertiary hover:text-error transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addService}
          className="mt-3 text-sm text-[var(--accent-teal)] hover:text-[var(--accent-teal-light)] font-medium transition-colors"
        >
          + Ajouter un service
        </button>
      </div>

      {/* Proposition de valeur */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Proposition de valeur
        </label>
        <p className="text-sm text-text-tertiary mb-3">
          En une phrase, quelle valeur apportez-vous à vos clients ?
        </p>
        <textarea
          value={formData.valueProp}
          onChange={(e) => updateFormData({ valueProp: e.target.value })}
          placeholder="Ex: Je transforme vos idées en applications web performantes et élégantes"
          rows={3}
          className="w-full px-4 py-3 bg-bg-tertiary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}
