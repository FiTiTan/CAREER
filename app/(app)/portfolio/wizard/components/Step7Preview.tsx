'use client';

// ============================================================
// Step 7 : Preview & Édition
// ============================================================

import { useState, useEffect, useRef } from 'react';
import type { PortfolioFormData } from '@/lib/portfolio/types';

interface Step7Props {
  html: string;
  formData: PortfolioFormData;
  updateFormData: (updates: Partial<PortfolioFormData>) => void;
}

export default function Step7Preview({ html, formData, updateFormData }: Step7Props) {
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && html) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html, iframeKey]);

  const refreshPreview = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-bg-tertiary rounded-lg p-4 border border-[var(--border-light)] flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Prévisualisez votre portfolio. Vous pourrez l'éditer après la création.
        </p>
        <button
          onClick={refreshPreview}
          className="px-4 py-2 text-sm text-[var(--accent-teal)] hover:text-[var(--accent-teal-light)] font-medium transition-colors"
        >
          Actualiser
        </button>
      </div>

      {/* Preview iframe */}
      <div className="relative bg-bg-secondary rounded-lg border border-[var(--border-light)] overflow-hidden">
        <div className="aspect-video">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            title="Portfolio Preview"
            className="w-full h-full"
            sandbox="allow-same-origin"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            // Ouvrir dans un nouvel onglet
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }}
          className="flex-1 px-6 py-3 bg-bg-tertiary border border-[var(--border-default)] rounded-lg text-text-primary font-medium hover:bg-bg-primary transition-colors"
        >
          <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Ouvrir en plein écran
        </button>
      </div>
    </div>
  );
}
