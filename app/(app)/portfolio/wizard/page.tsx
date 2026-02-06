'use client';

// ============================================================
// Page : /portfolio/wizard
// Wizard de création de portfolio (8 étapes)
// ============================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initialPortfolioFormData, type PortfolioFormData } from '@/lib/portfolio/types';
import Step1Identity from './components/Step1Identity';
import Step2Offer from './components/Step2Offer';
import Step3Contact from './components/Step3Contact';
import Step4Content from './components/Step4Content';
import Step5Template from './components/Step5Template';
import Step6Generate from './components/Step6Generate';
import Step7Preview from './components/Step7Preview';
import Step8Export from './components/Step8Export';

const STEPS = [
  { id: 1, title: 'Identité', subtitle: 'Qui êtes-vous ?' },
  { id: 2, title: 'Offre', subtitle: 'Vos services' },
  { id: 3, title: 'Contact', subtitle: 'Comment vous joindre' },
  { id: 4, title: 'Contenu', subtitle: 'Réalisations & projets' },
  { id: 5, title: 'Template', subtitle: 'Choisir un design' },
  { id: 6, title: 'Génération', subtitle: 'IA enrichit le contenu' },
  { id: 7, title: 'Preview', subtitle: 'Aperçu & édition' },
  { id: 8, title: 'Export', subtitle: 'Publier votre portfolio' },
];

export default function PortfolioWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PortfolioFormData>({
    ...initialPortfolioFormData,
    portfolioId: crypto.randomUUID(),
  });
  const [generatedHTML, setGeneratedHTML] = useState<string>('');

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (updates: Partial<PortfolioFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  const handleCancel = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Les données non sauvegardées seront perdues.')) {
      router.push('/portfolio');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Progress Bar */}
      <div className="bg-bg-secondary border-b border-[var(--border-light)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-text-primary">
              Nouveau Portfolio
            </h1>
            <button
              onClick={handleCancel}
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`
                    flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all
                    ${
                      step.id === currentStep
                        ? 'bg-[var(--accent-teal-bg)] text-[var(--accent-teal)] font-medium'
                        : step.id < currentStep
                        ? 'text-[var(--accent-teal)] hover:bg-bg-tertiary cursor-pointer'
                        : 'text-text-muted cursor-not-allowed'
                    }
                  `}
                >
                  <span
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-sm
                      ${
                        step.id === currentStep
                          ? 'bg-[var(--accent-teal)] text-white'
                          : step.id < currentStep
                          ? 'bg-[var(--success)] text-white'
                          : 'bg-bg-tertiary text-text-muted'
                      }
                    `}
                  >
                    {step.id < currentStep ? '✓' : step.id}
                  </span>
                  <span className="hidden md:block text-sm">{step.title}</span>
                </button>
                {index < STEPS.length - 1 && (
                  <div className={`h-0.5 w-4 ${step.id < currentStep ? 'bg-[var(--success)]' : 'bg-bg-tertiary'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-bg-secondary rounded-xl p-8 border border-[var(--border-light)]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-text-secondary">
              {STEPS[currentStep - 1].subtitle}
            </p>
          </div>

          {/* Render current step */}
          {currentStep === 1 && (
            <Step1Identity formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Step2Offer formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <Step3Contact formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <Step4Content formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 5 && (
            <Step5Template formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 6 && (
            <Step6Generate
              formData={formData}
              onComplete={(html) => {
                setGeneratedHTML(html);
                nextStep();
              }}
            />
          )}
          {currentStep === 7 && (
            <Step7Preview
              html={generatedHTML}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 8 && (
            <Step8Export
              html={generatedHTML}
              formData={formData}
            />
          )}

          {/* Navigation */}
          {currentStep !== 6 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border-light)]">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Retour
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === 8}
                className="px-6 py-3 bg-[var(--anthracite)] text-white rounded-full font-medium hover:bg-[var(--anthracite-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentStep === 5 ? 'Générer mon portfolio →' : 'Continuer →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
