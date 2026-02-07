'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const wasDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt || dismissed) return null;

  return (
    <div className="pwa-install-prompt card animate-slide-in-bottom">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-xl flex-shrink-0">
          ◆
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Installer CareerCare</h3>
          <p className="text-sm text-secondary mb-3">
            Installez l'app pour un accès rapide et des notifications.
          </p>
          <div className="flex gap-2">
            <button onClick={handleInstall} className="btn btn-primary btn-sm">
              Installer
            </button>
            <button onClick={handleDismiss} className="btn btn-ghost btn-sm">
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
