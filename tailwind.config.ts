import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--calm-primary)',
        secondary: 'var(--calm-secondary)',
        accent: 'var(--calm-accent)',
        background: 'var(--calm-bg)',
        card: 'var(--calm-bg-card)',
        hover: 'var(--calm-bg-hover)',
        muted: 'var(--calm-text-muted)',
        subtle: 'var(--calm-border)',
        success: 'var(--calm-success)',
        warning: 'var(--calm-warning)',
        error: 'var(--calm-error)',
      },
      fontFamily: {
        sans: ['var(--calm-font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--calm-font-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--calm-radius-md)',
        sm: 'var(--calm-radius-sm)',
        lg: 'var(--calm-radius-lg)',
        xl: 'var(--calm-radius-xl)',
      },
      boxShadow: {
        glow: 'var(--calm-shadow-glow)',
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
