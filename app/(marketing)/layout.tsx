import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--calm-bg)]">
      {/* Header */}
      <header className="border-b border-subtle">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              ◆
            </div>
            <span className="font-semibold text-lg">CareerCare</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/features" className="text-secondary hover:text-white transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="text-secondary hover:text-white transition-colors">
              Tarifs
            </Link>
            <Link href="/about" className="text-secondary hover:text-white transition-colors">
              À propos
            </Link>
            <Link href="/blog" className="text-secondary hover:text-white transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="btn btn-ghost btn-sm">
              Connexion
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Commencer
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-subtle py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  ◆
                </div>
                <span className="font-semibold">CareerCare</span>
              </Link>
              <p className="text-sm text-muted">
                Prenez soin de votre carrière avec l'intelligence artificielle.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/features" className="hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="/demo" className="hover:text-white">Démo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/about" className="hover:text-white">À propos</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
                <li><Link href="/cgu" className="hover:text-white">CGU</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white">Confidentialité</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">
              © 2026 CareerCare. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>🇫🇷 Made in France</span>
              <span>🇪🇺 Hébergé en UE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
