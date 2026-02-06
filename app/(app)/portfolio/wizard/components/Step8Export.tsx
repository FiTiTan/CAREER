'use client';

// ============================================================
// Step 8 : Export & Publication
// ============================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PortfolioFormData } from '@/lib/portfolio/types';

interface Step8Props {
  html: string;
  formData: PortfolioFormData;
}

export default function Step8Export({ html, formData }: Step8Props) {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadHTML = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${formData.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (!slug.trim()) {
      setError('Veuillez saisir un slug');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: slug.trim().toLowerCase(),
          title: formData.name,
          data: formData,
          template: formData.templateId,
          published: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
      }

      const { portfolio } = await response.json();
      
      // Rediriger vers la page d'édition
      router.push(`/portfolio/${portfolio.id}/edit`);
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Option 1 : Télécharger HTML */}
      <div className="bg-bg-tertiary rounded-lg p-6 border border-[var(--border-light)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[var(--accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary mb-1">Télécharger HTML</h3>
            <p className="text-sm text-text-secondary mb-4">
              Téléchargez le fichier HTML pour l'héberger vous-même
            </p>
            <button
              onClick={handleDownloadHTML}
              className="px-6 py-2 bg-bg-secondary border border-[var(--border-default)] rounded-lg text-text-primary font-medium hover:bg-bg-primary transition-colors"
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>

      {/* Option 2 : Sauvegarder & Publier */}
      <div className="bg-bg-tertiary rounded-lg p-6 border border-[var(--border-light)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[var(--accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary mb-1">Sauvegarder & éditer</h3>
            <p className="text-sm text-text-secondary mb-4">
              Sauvegardez votre portfolio pour le modifier et le publier plus tard
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-[var(--error-bg)] text-[var(--error)] rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Slug (URL)
                </label>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-bg-secondary border border-[var(--border-light)] rounded-lg text-text-tertiary">
                    careercare.io/p/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="mon-portfolio"
                    className="flex-1 px-4 py-2 bg-bg-secondary border border-[var(--border-light)] rounded-lg text-text-primary placeholder:text-text-muted focus:border-[var(--accent-teal)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving || !slug.trim()}
                className="w-full px-6 py-3 bg-[var(--anthracite)] text-white rounded-lg font-medium hover:bg-[var(--anthracite-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder & continuer'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-bg-tertiary rounded-lg p-4 border border-[var(--border-light)]">
        <p className="text-sm text-text-tertiary">
          💡 Après sauvegarde, vous pourrez éditer le contenu, ajouter des images, et publier votre portfolio.
        </p>
      </div>
    </div>
  );
}
