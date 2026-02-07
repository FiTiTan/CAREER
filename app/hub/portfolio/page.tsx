import Link from 'next/link';

export default function PortfolioPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios: any[] = [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🎨</span>
            Portfolio
          </h1>
          <p className="text-secondary mt-1">
            Créez et publiez votre portfolio professionnel
          </p>
        </div>
        <Link href="/hub/portfolio/wizard" className="btn btn-primary">
          + Créer un portfolio
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction href="/hub/portfolio/wizard" icon="✨" label="Nouveau" />
        <QuickAction href="/hub/portfolio/templates" icon="🎨" label="Templates" />
        <QuickAction href="/hub/portfolio" icon="📊" label="Analytics" badge="Pro" />
        <QuickAction href="/hub/portfolio" icon="🔗" label="Partager" />
      </div>

      {/* Portfolios List */}
      {portfolios.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      )}

      {/* Templates Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Templates disponibles</h2>
          <Link href="/hub/portfolio/templates" className="text-sm text-primary hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TemplateCard name="Bento Grid" free />
          <TemplateCard name="Glassmorphism" free />
          <TemplateCard name="Minimal Apple" free />
          <TemplateCard name="Brutalism" premium />
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
  badge,
}: {
  href: string;
  icon: string;
  label: string;
  badge?: string;
}) {
  return (
    <Link href={href} className="card card-interactive text-center py-6 relative">
      <span className="text-3xl">{icon}</span>
      <p className="font-medium mt-2">{label}</p>
      {badge && (
        <span className="absolute top-2 right-2 badge pill-pro text-xs">{badge}</span>
      )}
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="card text-center py-12">
      <div className="text-5xl mb-4">🎨</div>
      <h3 className="text-xl font-semibold mb-2">Créez votre premier portfolio</h3>
      <p className="text-secondary mb-6 max-w-md mx-auto">
        Utilisez notre wizard guidé pour créer un portfolio professionnel en quelques minutes.
      </p>
      <Link href="/hub/portfolio/wizard" className="btn btn-primary">
        Commencer
      </Link>
    </div>
  );
}

function PortfolioCard({ portfolio }: { portfolio: any }) {
  return (
    <Link href={`/hub/portfolio/${portfolio.id}`} className="card card-interactive">
      <div className="aspect-video bg-hover rounded-lg mb-4 overflow-hidden">
        {portfolio.thumbnail ? (
          <img src={portfolio.thumbnail} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-muted">
            🎨
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{portfolio.name || 'Mon Portfolio'}</h3>
          <p className="text-sm text-muted">
            {portfolio.published ? '🌐 Publié' : '📝 Brouillon'}
          </p>
        </div>
        <span className="badge">{portfolio.template}</span>
      </div>
    </Link>
  );
}

function TemplateCard({ name, free, premium }: { name: string; free?: boolean; premium?: boolean }) {
  return (
    <div className="card text-center py-6 relative">
      <div className="w-16 h-16 mx-auto rounded-lg bg-hover flex items-center justify-center text-2xl mb-3">
        🎨
      </div>
      <p className="font-medium text-sm">{name}</p>
      {free && <span className="badge mt-2">Gratuit</span>}
      {premium && <span className="badge pill-pro mt-2">Pro</span>}
    </div>
  );
}
