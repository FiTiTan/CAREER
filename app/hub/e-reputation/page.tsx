import Link from 'next/link';

export default function EReputationPage() {
  // TODO: Fetch reputation scan from Supabase
  const lastScan = null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🌐</span>
            E-Réputation
          </h1>
          <p className="text-secondary mt-1">
            Surveillez et améliorez votre présence en ligne
          </p>
        </div>
        <Link href="/hub/e-reputation/scan" className="btn btn-primary">
          🔍 Lancer un scan
        </Link>
      </div>

      {!lastScan ? (
        <ScanCTA />
      ) : (
        <>
          {/* Score Overview */}
          <div className="card">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">72</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Score E-Réputation</h2>
                <p className="text-secondary">
                  Dernière analyse : il y a 3 jours
                </p>
              </div>
              <div className="text-right">
                <span className="badge badge-success">↑ +5</span>
                <p className="text-xs text-muted mt-1">vs mois dernier</p>
              </div>
            </div>
          </div>

          {/* Platforms Grid */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Plateformes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PlatformCard
                platform="LinkedIn"
                icon="💼"
                score={85}
                connected={true}
              />
              <PlatformCard
                platform="Google"
                icon="🔍"
                score={70}
                connected={true}
              />
              <PlatformCard
                platform="Twitter"
                icon="🐦"
                score={null}
                connected={false}
              />
              <PlatformCard
                platform="GitHub"
                icon="🐙"
                score={90}
                connected={true}
              />
            </div>
          </div>

          {/* Alerts */}
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span>🔔</span> Alertes récentes
            </h3>
            <div className="space-y-3">
              <AlertItem
                type="positive"
                message="Nouvelle mention positive sur LinkedIn"
                time="Il y a 2h"
              />
              <AlertItem
                type="neutral"
                message="Votre profil Google a été mis à jour"
                time="Il y a 1j"
              />
            </div>
            <Link
              href="/hub/e-reputation/alerts"
              className="block text-center text-sm text-primary mt-4 hover:underline"
            >
              Voir toutes les alertes →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function ScanCTA() {
  return (
    <div className="card text-center py-12">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🌐</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">Analysez votre présence en ligne</h2>
      <p className="text-secondary mb-6 max-w-md mx-auto">
        Lancez un scan pour découvrir ce que le web dit de vous
        et recevez des recommandations personnalisées.
      </p>
      <Link href="/hub/e-reputation/scan" className="btn btn-primary">
        Lancer mon premier scan
      </Link>
    </div>
  );
}

function PlatformCard({
  platform,
  icon,
  score,
  connected,
}: {
  platform: string;
  icon: string;
  score: number | null;
  connected: boolean;
}) {
  return (
    <div className="card text-center">
      <span className="text-3xl">{icon}</span>
      <p className="font-medium mt-2">{platform}</p>
      {connected ? (
        <div className="mt-2">
          <span
            className="text-lg font-bold"
            style={{
              color: score! >= 80
                ? 'var(--calm-success)'
                : score! >= 60
                ? 'var(--calm-primary)'
                : 'var(--calm-warning)',
            }}
          >
            {score}%
          </span>
        </div>
      ) : (
        <span className="badge mt-2">Non connecté</span>
      )}
    </div>
  );
}

function AlertItem({
  type,
  message,
  time,
}: {
  type: 'positive' | 'neutral' | 'negative';
  message: string;
  time: string;
}) {
  const icons = {
    positive: '✅',
    neutral: 'ℹ️',
    negative: '⚠️',
  };

  const colors = {
    positive: 'text-success',
    neutral: 'text-muted',
    negative: 'text-warning',
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-hover">
      <span className={colors[type]}>{icons[type]}</span>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted mt-1">{time}</p>
      </div>
    </div>
  );
}
