'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?onboarding=true`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">✉️</div>
        <h1 className="text-2xl font-bold mb-2">Vérifiez vos emails</h1>
        <p className="text-secondary mb-6">
          Un lien d'activation a été envoyé à <strong>{email}</strong>
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-primary hover:underline"
        >
          Utiliser une autre adresse
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center text-2xl mb-4">
          ◆
        </div>
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-secondary mt-1">
          Rejoignez CareerCare gratuitement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="vous@exemple.fr"
            required
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-secondary">
            J'accepte les{' '}
            <Link href="/cgu" className="text-primary hover:underline">
              conditions d'utilisation
            </Link>{' '}
            et la{' '}
            <Link href="/confidentialite" className="text-primary hover:underline">
              politique de confidentialité
            </Link>
          </span>
        </label>

        {error && (
          <p className="text-error text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Déjà un compte ?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
