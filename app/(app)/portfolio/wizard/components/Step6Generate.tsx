'use client';

// ============================================================
// Step 6 : Génération IA (Animation + appel API)
// ============================================================

import { useState, useEffect } from 'react';
import type { PortfolioFormData } from '@/lib/portfolio/types';
import { enrichPortfolioWithAI, fallbackEnrichment } from '@/lib/portfolio/enrichment';
import { injectTemplateData, loadTemplateHTML } from '@/lib/portfolio/templateInjector';

interface Step6Props {
  formData: PortfolioFormData;
  onComplete: (html: string) => void;
}

export default function Step6Generate({ formData, onComplete }: Step6Props) {
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Préparation...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generatePortfolio();
  }, []);

  const generatePortfolio = async () => {
    try {
      // 1. Anonymisation (skip — pas nécessaire pour Portfolio)
      setProgress(10);
      setMessage('Préparation des données...');
      await sleep(500);

      // 2. Enrichissement IA
      setProgress(20);
      setMessage('Enrichissement par l\'IA...');
      
      const enrichmentResult = await enrichPortfolioWithAI({
        formData,
        profileContext: formData.profileContext || 'niche',
        importedText: formData.importSources[0]?.extractedText,
      }).catch((err) => {
        console.error('AI enrichment failed, using fallback:', err);
        return {
          enrichedData: fallbackEnrichment(formData, formData.profileContext || 'niche'),
          tokensUsed: 0,
          processingTime: 0,
        };
      });

      setProgress(60);
      setMessage('Chargement du template...');
      await sleep(500);

      // 3. Charger le template HTML
      if (!formData.templateId) {
        throw new Error('Aucun template sélectionné');
      }

      const templateHTML = await loadTemplateHTML(formData.templateId);

      setProgress(80);
      setMessage('Injection des données...');
      await sleep(500);

      // 4. Injecter les données dans le template
      const finalHTML = injectTemplateData(templateHTML, enrichmentResult.enrichedData);

      setProgress(100);
      setMessage('Portfolio généré avec succès !');
      await sleep(800);

      setStatus('done');
      onComplete(finalHTML);
    } catch (err) {
      console.error('Portfolio generation error:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erreur lors de la génération');
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  if (status === 'error') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[var(--error-bg)] rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Erreur de génération</h3>
        <p className="text-text-secondary mb-6">{error}</p>
        <button
          onClick={generatePortfolio}
          className="px-6 py-3 bg-[var(--anthracite)] text-white rounded-full font-medium hover:bg-[var(--anthracite-hover)] transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      {/* Animation orbe IA */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-violet)] rounded-full animate-pulse" />
        <div className="absolute inset-2 bg-bg-secondary rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-[var(--accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mb-4">
        <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-violet)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Message */}
      <p className="text-text-secondary font-medium">{message}</p>
      <p className="text-sm text-text-tertiary mt-2">{progress}%</p>
    </div>
  );
}
