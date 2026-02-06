'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

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
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E5E5',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
    }}>
      {/* Logo */}
      <Link href="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        fontWeight: 600, 
        fontSize: '1.25rem',
        marginBottom: '2rem',
        textDecoration: 'none',
        color: '#1A1A1A',
        width: 'fit-content'
      }}>
        <svg style={{ width: '24px', height: '24px', flexShrink: 0, color: '#0D9488' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <span>CareerCare</span>
      </Link>

      <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Connexion</h1>
      <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
        Entrez votre email pour recevoir un lien de connexion
      </p>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@exemple.fr"
            required
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#F9FAFB',
              border: '1px solid #D1D5DB',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0D9488'
              e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        {message && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            backgroundColor: message.type === 'success' ? '#DCFCE7' : '#FEE2E2',
            color: message.type === 'success' ? '#16A34A' : '#DC2626'
          }}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            fontWeight: 500,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#374151')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1F2937')}
        >
          {loading ? 'Envoi...' : 'Envoyer le lien'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Link href="/" style={{ fontSize: '0.875rem', color: '#6B7280', textDecoration: 'none' }}>
          ← Retour à l'accueil
        </Link>
      </div>

      <div style={{ 
        marginTop: '1.5rem', 
        paddingTop: '1.5rem', 
        borderTop: '1px solid #E5E5E5', 
        fontSize: '0.75rem', 
        color: '#9CA3AF' 
      }}>
        Pas de mot de passe nécessaire. Nous vous envoyons un lien de connexion sécurisé par email.
      </div>
    </div>
  )
}
