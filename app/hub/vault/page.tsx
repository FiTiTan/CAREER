import Link from 'next/link';

export default function VaultPage() {
  // TODO: Fetch files and folders from Supabase
  const files: any[] = [];
  const folders: any[] = [];
  const quota = { used: 15, max: 100, files: 5 };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            Coffre-Fort
          </h1>
          <p className="text-secondary mt-1">
            Stockez et organisez vos documents de carrière en sécurité
          </p>
        </div>
        <Link href="/hub/vault/upload" className="btn btn-primary">
          + Ajouter
        </Link>
      </div>

      {/* Quota */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Espace utilisé</span>
          <span className="text-sm font-medium">{quota.used} MB / {quota.max} MB</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${(quota.used / quota.max) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted mt-2">
          {quota.files} fichiers • Passez à Pro pour 1 GB de stockage
        </p>
      </div>

      {/* Quick Folders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FolderCard icon="📄" label="CV" count={2} />
        <FolderCard icon="✉️" label="Lettres" count={3} />
        <FolderCard icon="🎓" label="Diplômes" count={1} />
        <FolderCard icon="📋" label="Autres" count={0} />
      </div>

      {/* Recent Files */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Fichiers récents</h2>
        {files.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FolderCard({ icon, label, count }: { icon: string; label: string; count: number }) {
  return (
    <Link href={`/hub/vault/folders/${label.toLowerCase()}`} className="card card-interactive text-center py-6">
      <span className="text-3xl">{icon}</span>
      <p className="font-medium mt-2">{label}</p>
      <span className="text-sm text-muted">{count} fichiers</span>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="card text-center py-12">
      <div className="text-5xl mb-4">📁</div>
      <h3 className="text-xl font-semibold mb-2">Votre coffre est vide</h3>
      <p className="text-secondary mb-6">
        Commencez par ajouter vos CV, lettres de motivation et diplômes.
      </p>
      <Link href="/hub/vault/upload" className="btn btn-primary">
        Ajouter un fichier
      </Link>
    </div>
  );
}

function FileCard({ file }: { file: any }) {
  const getIcon = (type: string) => {
    if (type.includes('pdf')) return '📕';
    if (type.includes('word') || type.includes('document')) return '📘';
    if (type.includes('image')) return '🖼️';
    return '📄';
  };

  return (
    <Link href={`/hub/vault/${file.id}`} className="card card-interactive">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-hover flex items-center justify-center text-2xl">
          {getIcon(file.mime_type)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{file.name}</h3>
          <p className="text-sm text-muted">
            {(file.size / 1024).toFixed(1)} KB • {new Date(file.created_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
        {file.starred && <span className="text-warning">⭐</span>}
      </div>
    </Link>
  );
}
