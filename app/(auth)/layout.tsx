import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--calm-bg)] flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            ◆
          </div>
          <span className="font-semibold">CareerCare</span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted">
        <p>© 2026 CareerCare. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
