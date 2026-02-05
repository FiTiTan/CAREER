'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({
        type: 'success',
        text: 'Vérifiez vos emails ! Un lien de connexion vous a été envoyé.',
      })
    }
  }

  return (
    <div className="bg-bg-secondary border border-border-light rounded-2xl p-8">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-xl mb-8 w-fit">
        <svg className="w-6 h-6 flex-shrink-0" style={{ color: '#0D9488' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <span>CareerCare</span>
      </Link>

      <h1 className="text-2xl font-semibold mb-2">Connexion</h1>
      <p className="text-text-secondary mb-6">
        Entrez votre email pour recevoir un lien de connexion
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@exemple.fr"
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-border-light focus:border-accent-teal-DEFAULT focus:outline-none transition-calm"
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-success-bg text-success-DEFAULT'
                : 'bg-error-bg text-error-DEFAULT'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg bg-anthracite text-white font-medium hover:bg-anthracite-hover disabled:opacity-50 transition-calm"
        >
          {loading ? 'Envoi...' : 'Envoyer le lien'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-text-secondary hover:text-text-primary transition-calm">
          ← Retour à l'accueil
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-border-light text-xs text-text-tertiary">
        Pas de mot de passe nécessaire. Nous vous envoyons un lien de connexion sécurisé par email.
      </div>
    </div>
  )
}
