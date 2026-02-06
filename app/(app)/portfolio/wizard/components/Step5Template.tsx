'use client';

// ============================================================
// Step 5 : Choix du Template
// ============================================================

import { useState, useEffect } from 'react';
import type { PortfolioFormData, TemplateRegistry, TemplateInfo } from '@/lib/portfolio/types';

interface Step5Props {
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step5Template({ formData, updateFormData }: Step5Props) {
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/templates/portfolio/index.json')
      .then((res) => res.json())
      .then((data: TemplateRegistry) => {
        setTemplates(data.templates);
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

  if (!templates.length) {
    return (
      <div className="text-center py-12 text-error">
        Erreur lors du chargement des templates
      </div>
    );
  }

  const freeTemplates = templates.filter(t => t.category === 'free');
  const premiumTemplates = templates.filter(t => t.category === 'premium');

  return (
    <div className="space-y-6">
      <div className="bg-bg-tertiary rounded-lg p-4 border border-[var(--border-light)]">
        <p className="text-sm text-text-secondary">
          Choisissez un template pour votre portfolio. Le design s'adaptera automatiquement à vos données.
        </p>
      </div>

      {/* Templates gratuits */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Templates disponibles ({freeTemplates.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {freeTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => updateFormData({ templateId: template.id })}
              className={`
                group relative bg-bg-tertiary rounded-lg p-4 border-2 transition-all text-left
                ${
                  formData.templateId === template.id
                    ? 'border-accent bg-accent-muted'
                    : 'border-[var(--border-light)] hover:border-accent'
                }
              `}
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-bg-secondary rounded-md mb-3 flex items-center justify-center text-text-muted overflow-hidden">
                <div className="text-center p-2">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span className="text-xs">{template.name}</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-text-primary mb-1 truncate">{template.name}</h4>
                  <p className="text-xs text-text-tertiary line-clamp-2 mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.idealFor.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-block px-2 py-0.5 bg-bg-secondary text-text-tertiary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {formData.templateId === template.id && (
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
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

      {/* Templates premium (si applicable) */}
      {premiumTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Templates Premium ({premiumTemplates.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => updateFormData({ templateId: template.id })}
                className={`
                  group relative bg-bg-tertiary rounded-lg p-4 border-2 transition-all text-left
                  ${
                    formData.templateId === template.id
                      ? 'border-accent bg-accent-muted'
                      : 'border-[var(--border-light)] hover:border-accent'
                  }
                `}
              >
                <div className="aspect-video bg-bg-secondary rounded-md mb-3 flex items-center justify-center text-text-muted">
                  <span className="text-xs">{template.name}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">{template.name}</h4>
                    <span className="inline-block px-2 py-1 bg-warning-bg text-warning text-xs font-medium rounded">
                      {template.price}€
                    </span>
                  </div>
                  {formData.templateId === template.id && (
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
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
      )}
    </div>
  );
}
