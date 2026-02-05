import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <svg className="w-6 h-6 text-accent-teal" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          CareerCare
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-calm">
            Fonctionnalités
          </Link>
          <Link href="/pricing" className="text-sm text-text-secondary hover:text-text-primary transition-calm">
            Tarifs
          </Link>
          <Link href="/about" className="text-sm text-text-secondary hover:text-text-primary transition-calm">
            À propos
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-text-secondary hover:text-text-primary transition-calm"
          >
            Connexion
          </Link>
          <Link
            href="/cv/new"
            className="px-4 py-2 rounded-pill bg-anthracite text-white text-sm font-medium hover:bg-anthracite-hover transition-calm"
          >
            Analyser mon CV
          </Link>
        </div>
      </div>
    </header>
  )
}
