import Link from 'next/link';

export default function CVCoachPage() {
  // TODO: Fetch CV analyses from Supabase
  const analyses: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">📄</span>
            CV Coach IA
          </h1>
          <p className="text-secondary mt-1">
            Analysez et optimisez votre CV avec l'intelligence artificielle
          </p>
        </div>
        <Link href="/hub/cv-coach/new" className="btn btn-primary">
          + Analyser un CV
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="CV analysés" value="3" />
        <StatCard label="Score moyen" value="78%" />
        <StatCard label="Suggestions" value="12" />
        <StatCard label="Améliorations" value="+15%" positive />
      </div>

      {/* Analyses List */}
      {analyses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="card">
      <p className="text-sm text-muted">{label}</p>
      <p className={`text-2xl font-bold ${positive ? 'text-success' : ''}`}>{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">📄</div>
      <h3 className="text-xl font-semibold mb-2">Aucun CV analysé</h3>
      <p className="text-secondary mb-6">
        Uploadez votre CV pour recevoir une analyse IA détaillée et des suggestions d'amélioration.
      </p>
      <Link href="/hub/cv-coach/new" className="btn btn-primary">
        Analyser mon CV
      </Link>
    </div>
  );
}

function AnalysisCard({ analysis }: { analysis: any }) {
  return (
    <Link href={`/hub/cv-coach/${analysis.id}`} className="card card-interactive block">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-xl">
          📄
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{analysis.file_name}</h3>
          <p className="text-sm text-muted">
            Analysé le {new Date(analysis.created_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{analysis.score}%</div>
          <p className="text-xs text-muted">Score ATS</p>
        </div>
      </div>
    </Link>
  );
}
