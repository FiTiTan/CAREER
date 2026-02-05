import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
        },
        // Text
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
        },
        // Borders
        border: {
          light: 'var(--border-light)',
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        // Anthracite (primary actions)
        anthracite: {
          DEFAULT: 'var(--anthracite)',
          hover: 'var(--anthracite-hover)',
        },
        // Accents
        'accent-teal': '#0D9488',
        'accent-teal-light': '#14B8A6',
        'accent-teal-bg': 'var(--accent-teal-bg)',
        'accent-violet': '#7C3AED',
        'accent-violet-light': '#8B5CF6',
        'accent-violet-bg': 'var(--accent-violet-bg)',
        'accent-amber': '#D97706',
        'accent-amber-light': '#F59E0B',
        'accent-amber-bg': 'var(--accent-amber-bg)',
        // Semantic
        success: { DEFAULT: '#16A34A', bg: 'var(--success-bg)' },
        warning: { DEFAULT: '#CA8A04', bg: 'var(--warning-bg)' },
        error: { DEFAULT: '#DC2626', bg: 'var(--error-bg)' },
        // Score colors
        score: {
          excellent: '#16A34A',
          good: '#22C55E',
          average: '#EAB308',
          poor: '#F97316',
          critical: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        pill: '9999px',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}

export default config
