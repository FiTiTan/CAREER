import Link from 'next/link';

export default function LinkedInPage() {
  // TODO: Fetch LinkedIn profile from Supabase
  const profile = null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💼</span>
            LinkedIn Optimizer
          </h1>
          <p className="text-secondary mt-1">
            Optimisez votre profil LinkedIn pour maximiser votre visibilité
          </p>
        </div>
      </div>

      {!profile ? (
        <ImportCTA />
      ) : (
        <>
          {/* Score Overview */}
          <div className="card">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">72</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Score LinkedIn</h2>
                <p className="text-secondary">
                  5 améliorations recommandées pour atteindre 90+
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction href="/hub/linkedin/analysis" icon="📊" label="Analyse" />
            <QuickAction href="/hub/linkedin/suggestions" icon="💡" label="Suggestions" />
            <QuickAction href="/hub/linkedin/plan" icon="📅" label="Plan 30j" badge="Pro" />
            <QuickAction href="/hub/linkedin/import" icon="🔄" label="Actualiser" />
          </div>

          {/* Section Scores */}
          <div className="card">
            <h3 className="font-semibold mb-4">Analyse par section</h3>
            <div className="space-y-4">
              <SectionScore section="Photo" score={80} />
              <SectionScore section="Titre" score={65} />
              <SectionScore section="À propos" score={40} />
              <SectionScore section="Expériences" score={85} />
              <SectionScore section="Compétences" score={70} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ImportCTA() {
  return (
    <div className="card text-center py-12">
      <div className="w-20 h-20 rounded-full bg-[#0a66c2]/20 flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">💼</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">Importez votre profil LinkedIn</h2>
      <p className="text-secondary mb-6 max-w-md mx-auto">
        Connectez votre profil LinkedIn pour recevoir une analyse détaillée
        et des recommandations personnalisées.
      </p>
      <Link href="/hub/linkedin/import" className="btn btn-primary">
        Importer mon profil
      </Link>
      <p className="text-xs text-muted mt-4">
        Vos données restent privées et ne sont jamais partagées.
      </p>
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

function SectionScore({ section, score }: { section: string; score: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return 'var(--calm-success)';
    if (s >= 60) return 'var(--calm-primary)';
    if (s >= 40) return 'var(--calm-warning)';
    return 'var(--calm-error)';
  };

  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-sm text-muted">{section}</span>
      <div className="flex-1 h-2 bg-hover rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: getColor(score) }}
        />
      </div>
      <span className="w-12 text-right font-medium" style={{ color: getColor(score) }}>
        {score}%
      </span>
    </div>
  );
}
