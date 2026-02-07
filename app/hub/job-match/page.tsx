import Link from 'next/link';

export default function JobMatchPage() {
  // TODO: Fetch job preferences and offers from Supabase
  const hasPreferences = true;
  const matchedOffers: any[] = [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            Job Match
          </h1>
          <p className="text-secondary mt-1">
            Trouvez les offres qui correspondent à votre profil
          </p>
        </div>
        <Link href="/hub/job-match/preferences" className="btn btn-secondary">
          ⚙️ Mes critères
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="🎯" label="Offres matchées" value="12" />
        <StatCard icon="📨" label="Candidatures" value="5" />
        <StatCard icon="📅" label="Entretiens" value="2" />
        <StatCard icon="📈" label="Match moyen" value="78%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction
          href="/hub/job-match/offers"
          icon="📋"
          label="Offres"
          count={12}
        />
        <QuickAction
          href="/hub/job-match/tracker"
          icon="📊"
          label="Kanban"
          count={5}
        />
        <QuickAction
          href="/hub/job-match/alerts"
          icon="🔔"
          label="Alertes"
          count={2}
        />
        <QuickAction
          href="/hub/job-match/preferences"
          icon="⚙️"
          label="Critères"
        />
      </div>

      {/* Recent Matches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Dernières offres matchées</h2>
          <Link href="/hub/job-match/offers" className="text-sm text-primary hover:underline">
            Voir tout →
          </Link>
        </div>

        {!hasPreferences ? (
          <SetupCTA />
        ) : matchedOffers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {matchedOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ href, icon, label, count }: { href: string; icon: string; label: string; count?: number }) {
  return (
    <Link href={href} className="card card-interactive text-center py-6">
      <span className="text-3xl">{icon}</span>
      <p className="font-medium mt-2">{label}</p>
      {count !== undefined && (
        <span className="badge badge-primary mt-1">{count}</span>
      )}
    </Link>
  );
}

function SetupCTA() {
  return (
    <div className="card text-center py-12 bg-primary-light border-primary/20">
      <div className="text-5xl mb-4">⚙️</div>
      <h3 className="text-xl font-semibold mb-2">Configurez vos critères</h3>
      <p className="text-secondary mb-6 max-w-md mx-auto">
        Définissez vos préférences (poste, lieu, salaire) pour recevoir des offres personnalisées.
      </p>
      <Link href="/hub/job-match/preferences" className="btn btn-primary">
        Définir mes critères
      </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card text-center py-12">
      <div className="text-5xl mb-4">🎯</div>
      <h3 className="text-xl font-semibold mb-2">Pas encore d'offres</h3>
      <p className="text-secondary">
        De nouvelles offres correspondant à vos critères apparaîtront ici.
      </p>
    </div>
  );
}

function OfferCard({ offer }: { offer: any }) {
  return (
    <Link href={`/hub/job-match/offers/${offer.id}`} className="card card-interactive block">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-hover flex items-center justify-center">
          {offer.company_logo ? (
            <img src={offer.company_logo} alt="" className="w-8 h-8 rounded" />
          ) : (
            <span className="text-xl">🏢</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{offer.title}</h3>
          <p className="text-sm text-muted">{offer.company} • {offer.location}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="badge">{offer.contract_type}</span>
            {offer.remote && <span className="badge badge-primary">Remote</span>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{offer.match_score}%</div>
          <p className="text-xs text-muted">Match</p>
        </div>
      </div>
    </Link>
  );
}
