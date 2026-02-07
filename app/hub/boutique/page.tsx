import Link from 'next/link';

// Mock products data
const products = [
  {
    id: 'cv-review-pro',
    name: 'Revue CV Pro',
    description: 'Analyse approfondie par un expert RH + rapport détaillé',
    price: 49,
    icon: '📝',
    category: 'cv_review',
    featured: true,
  },
  {
    id: 'linkedin-audit',
    name: 'Audit LinkedIn',
    description: 'Optimisation complète de votre profil LinkedIn',
    price: 79,
    icon: '💼',
    category: 'linkedin_audit',
    featured: true,
  },
  {
    id: 'coaching-30min',
    name: 'Coaching 30min',
    description: 'Session individuelle avec un coach carrière',
    price: 59,
    icon: '🎯',
    category: 'coaching',
    featured: false,
  },
  {
    id: 'bundle-job-search',
    name: 'Pack Recherche d\'emploi',
    description: 'CV + LinkedIn + Coaching — Économisez 30%',
    price: 149,
    originalPrice: 187,
    icon: '🎁',
    category: 'bundle',
    featured: true,
  },
];

export default function BoutiquePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🛒</span>
          Boutique
        </h1>
        <p className="text-secondary mt-1">
          Services premium pour booster votre carrière
        </p>
      </div>

      {/* Featured Banner */}
      <div className="card bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
        <div className="flex items-center gap-6">
          <div className="text-5xl">🎁</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Pack Recherche d'emploi</h2>
            <p className="text-secondary">
              CV + LinkedIn + Coaching — Tout ce qu'il faut pour décrocher le job
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted line-through">187€</span>
              <span className="text-2xl font-bold text-primary">149€</span>
            </div>
            <Link href="/hub/boutique/bundle-job-search" className="btn btn-primary mt-2">
              Voir l'offre
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        <button className="badge badge-primary">Tout</button>
        <button className="badge">CV</button>
        <button className="badge">LinkedIn</button>
        <button className="badge">Coaching</button>
        <button className="badge">Bundles</button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* My Purchases */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Mes achats</h2>
          <Link href="/hub/boutique/purchases" className="text-sm text-primary hover:underline">
            Voir tout →
          </Link>
        </div>
        <p className="text-muted text-center py-8">
          Vous n'avez pas encore effectué d'achat.
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/hub/boutique/${product.id}`}
      className="card card-interactive relative"
    >
      {product.featured && (
        <span className="absolute top-3 right-3 badge badge-primary">Populaire</span>
      )}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-2xl">
          {product.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              {product.originalPrice}€
            </span>
          )}
          <span className="text-xl font-bold text-primary">{product.price}€</span>
        </div>
        <span className="text-primary text-sm">Voir →</span>
      </div>
    </Link>
  );
}
