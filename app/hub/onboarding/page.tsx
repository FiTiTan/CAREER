'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    title: 'Bienvenue sur CareerCare',
    description: 'Prenez soin de votre carrière avec notre suite d\'outils alimentés par l\'IA.',
    icon: '👋',
  },
  {
    title: 'Votre CareerScore',
    description: 'Un score unique qui mesure la santé de votre carrière à travers 6 piliers.',
    icon: '◆',
  },
  {
    title: '6 modules puissants',
    description: 'CV Coach, Portfolio, Job Match, LinkedIn Optimizer, Coffre-Fort et E-Réputation.',
    icon: '🧩',
  },
  {
    title: 'RGPD & Confidentialité',
    description: 'Vos données restent en Europe. Anonymisation automatique avant toute analyse IA.',
    icon: '🔒',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [acceptedRGPD, setAcceptedRGPD] = useState(false);

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      if (!acceptedRGPD) {
        alert('Veuillez accepter la politique de confidentialité');
        return;
      }
      // TODO: Mark onboarding as completed in Supabase
      router.push('/hub');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    router.push('/hub');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-lg mx-auto text-center">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentStep ? 'bg-primary' : 'bg-hover'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="mb-8 animate-fade-in-up" key={currentStep}>
        <div className="text-6xl mb-6">{step.icon}</div>
        <h1 className="text-2xl font-bold mb-4">{step.title}</h1>
        <p className="text-secondary">{step.description}</p>
      </div>

      {/* RGPD acceptance on last step */}
      {isLastStep && (
        <label className="flex items-start gap-3 text-left mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedRGPD}
            onChange={(e) => setAcceptedRGPD(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-secondary">
            J'ai lu et j'accepte la{' '}
            <a href="/confidentialite" className="text-primary hover:underline" target="_blank">
              politique de confidentialité
            </a>{' '}
            et les{' '}
            <a href="/cgu" className="text-primary hover:underline" target="_blank">
              conditions d'utilisation
            </a>.
          </span>
        </label>
      )}

      {/* Actions */}
      <div className="flex gap-4 w-full">
        <button onClick={handleSkip} className="btn btn-ghost flex-1">
          Passer
        </button>
        <button onClick={handleNext} className="btn btn-primary flex-1">
          {isLastStep ? 'Commencer' : 'Suivant'}
        </button>
      </div>
    </div>
  );
}
