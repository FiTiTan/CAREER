import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-lg mb-4">
              <svg className="w-6 h-6 text-[#0D9488]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              CareerCare
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Le premier Career OS français. Prenez soin de votre carrière.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><Link href="/cv" className="text-sm text-text-secondary hover:text-text-primary transition-calm">CV Coach</Link></li>
              <li><Link href="/portfolio" className="text-sm text-text-secondary hover:text-text-primary transition-calm">Portfolio</Link></li>
              <li><Link href="/pricing" className="text-sm text-text-secondary hover:text-text-primary transition-calm">Tarifs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-text-secondary hover:text-text-primary transition-calm">À propos</Link></li>
              <li><Link href="/blog" className="text-sm text-text-secondary hover:text-text-primary transition-calm">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary transition-calm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-text-secondary hover:text-text-primary transition-calm">Confidentialité</Link></li>
              <li><Link href="/terms" className="text-sm text-text-secondary hover:text-text-primary transition-calm">CGU</Link></li>
              <li><Link href="/cookies" className="text-sm text-text-secondary hover:text-text-primary transition-calm">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-tertiary">
            © 2026 CareerCare. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://twitter.com/careercare" className="text-text-tertiary hover:text-text-primary transition-calm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </Link>
            <Link href="https://linkedin.com/company/careercare" className="text-text-tertiary hover:text-text-primary transition-calm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
