'use client';

// ============================================================
// Step 5 : Choix du Template
// ============================================================

import { useState, useEffect } from 'react';
import type { PortfolioFormData, TemplateRegistry } from '@/lib/portfolio/types';

interface Step5Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step5Template({ formData, updateFormData }: Step5Props) {
  const [templates, setTemplates] = useState<TemplateRegistry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/templates/portfolio/index.json')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading templates:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-tertiary">Chargement des templates...</div>
      </div>
    );
  }

  if (!templates) {
    return (
      <div className="text-center py-12 text-error">
        Erreur lors du chargement des templates
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-bg-tertiary rounded-lg p-4 border border-[var(--border-light)]">
        <p className="text-sm text-text-secondary">
          Choisissez un template pour votre portfolio. Le design s'adaptera automatiquement à vos données.
        </p>
      </div>

      {/* Templates gratuits */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Templates gratuits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.templates.free.map((template) => (
            <button
              key={template.id}
              onClick={() => updateFormData({ templateId: template.id })}
              className={`
                group relative bg-bg-tertiary rounded-lg p-4 border-2 transition-all text-left
                ${
                  formData.templateId === template.id
                    ? 'border-[var(--accent-teal)] bg-[var(--accent-teal-bg)]'
                    : 'border-[var(--border-light)] hover:border-[var(--accent-teal)]'
                }
              `}
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-bg-secondary rounded-md mb-3 flex items-center justify-center text-text-muted">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">{template.name}</h4>
                  <span className="inline-block px-2 py-1 bg-[var(--success-bg)] text-[var(--success)] text-xs font-medium rounded">
                    Gratuit
                  </span>
                </div>
                {formData.templateId === template.id && (
                  <div className="w-6 h-6 bg-[var(--accent-teal)] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
