// ============================================================
// Page : /portfolio
// Liste des portfolios de l'utilisateur
// ============================================================

import { Suspense } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function PortfolioPage() {
  const supabase = await createClient();
  
  // Vérifier auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Récupérer les portfolios
  const { data: portfolios, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary mb-2">
              Mes Portfolios
            </h1>
            <p className="text-text-secondary">
              Créez et gérez vos sites portfolio professionnels
            </p>
          </div>
          <Link
            href="/portfolio/wizard"
            className="px-6 py-3 bg-[var(--anthracite)] text-white rounded-full font-medium hover:bg-[var(--anthracite-hover)] transition-colors"
          >
            Créer un portfolio
          </Link>
        </div>

        {/* Liste des portfolios */}
        {!portfolios || portfolios.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio: any) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-bg-secondary rounded-xl p-12 text-center border border-[var(--border-light)]">
      <div className="w-16 h-16 bg-bg-tertiary rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-text-tertiary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        Aucun portfolio pour le moment
      </h3>
      <p className="text-text-secondary mb-6">
        Créez votre premier portfolio en 8 étapes guidées
      </p>
      <Link
        href="/portfolio/wizard"
        className="inline-block px-6 py-3 bg-[var(--anthracite)] text-white rounded-full font-medium hover:bg-[var(--anthracite-hover)] transition-colors"
      >
        Créer mon premier portfolio
      </Link>
    </div>
  );
}

function PortfolioCard({ portfolio }: { portfolio: any }) {
  return (
    <Link
      href={`/portfolio/${portfolio.id}/edit`}
      className="group bg-bg-secondary rounded-xl p-6 border border-[var(--border-light)] hover:border-[var(--accent-teal)] transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-[var(--accent-teal)] transition-colors">
            {portfolio.title}
          </h3>
          <p className="text-sm text-text-tertiary">
            Modifié {new Date(portfolio.updated_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
        {portfolio.published && (
          <span className="px-3 py-1 bg-[var(--success-bg)] text-[var(--success)] text-xs font-medium rounded-full">
            Publié
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="capitalize">{portfolio.template}</span>
      </div>
    </Link>
  );
}
