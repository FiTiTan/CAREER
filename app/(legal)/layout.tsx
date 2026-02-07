import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--calm-bg)]">
      <header className="border-b border-subtle">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              ◆
            </div>
            <span className="font-semibold">CareerCare</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </main>

      <footer className="border-t border-subtle py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted">
          <p>© 2026 CareerCare. Tous droits réservés.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
            <Link href="/cgu" className="hover:text-primary">CGU</Link>
            <Link href="/cgv" className="hover:text-primary">CGV</Link>
            <Link href="/confidentialite" className="hover:text-primary">Confidentialité</Link>
            <Link href="/cookies" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
