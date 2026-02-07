import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 lg:py-32 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm mb-8">
            <span>✨</span>
            <span>Nouvelle plateforme de gestion de carrière</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Prenez soin de votre{' '}
            <span className="text-primary">carrière</span>
          </h1>
          
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Optimisez votre CV, créez votre portfolio, boostez votre LinkedIn
            et trouvez le job idéal — le tout alimenté par l'IA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary btn-lg">
              Commencer gratuitement
            </Link>
            <Link href="/demo" className="btn btn-secondary btn-lg">
              Voir la démo
            </Link>
          </div>

          <p className="text-sm text-muted mt-4">
            Gratuit • Pas de carte bancaire • RGPD compliant
          </p>
        </div>
      </section>

      {/* CareerScore Preview */}
      <section className="py-20 bg-elevated">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Votre CareerScore</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Un score unique qui mesure la santé de votre carrière à travers 6 piliers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <PillarCard icon="📄" name="Documents" color="#4f8fff" />
            <PillarCard icon="🎨" name="Visibilité" color="#8b5cf6" />
            <PillarCard icon="💼" name="Réseau" color="#0a66c2" />
            <PillarCard icon="🎯" name="Dynamique" color="#06d6a0" />
            <PillarCard icon="🔒" name="Organisation" color="#ff8c42" />
            <PillarCard icon="🌐" name="Présence" color="#f472b6" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">6 modules puissants</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer et booster votre carrière
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="📄"
              title="CV Coach IA"
              description="Analysez votre CV avec l'IA et recevez des suggestions personnalisées pour améliorer votre score ATS."
            />
            <FeatureCard
              icon="🎨"
              title="Portfolio"
              description="Créez un portfolio professionnel en quelques minutes avec nos templates modernes."
            />
            <FeatureCard
              icon="🎯"
              title="Job Match"
              description="Trouvez les offres qui correspondent à votre profil avec notre algorithme de matching."
            />
            <FeatureCard
              icon="💼"
              title="LinkedIn Optimizer"
              description="Optimisez votre profil LinkedIn et suivez un plan d'action sur 30 jours."
            />
            <FeatureCard
              icon="🔒"
              title="Coffre-Fort"
              description="Stockez vos documents de carrière en sécurité : CV, diplômes, certificats."
            />
            <FeatureCard
              icon="🌐"
              title="E-Réputation"
              description="Surveillez ce que le web dit de vous et améliorez votre présence en ligne."
            />
          </div>
        </div>
      </section>

      {/* RGPD Section */}
      <section className="py-20 bg-elevated">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold mb-4">RGPD & Souveraineté</h2>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Vos données personnelles sont automatiquement anonymisées avant toute analyse IA.
            Aucune donnée sensible ne quitte l'Union Européenne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="badge">🇪🇺 Hébergement EU</span>
            <span className="badge">🔐 Anonymisation IA</span>
            <span className="badge">✅ RGPD Compliant</span>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Commencez gratuitement</h2>
          <p className="text-secondary mb-8">
            Plan Free généreux • Upgrade quand vous voulez
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard plan="Free" price="0" features={['3 analyses CV/mois', '1 portfolio', '100 MB stockage']} />
            <PricingCard plan="Pro" price="9.99" featured features={['Analyses illimitées', 'Tous les templates', 'Export PDF', 'Analytics']} />
            <PricingCard plan="Business" price="29.99" features={['Tout Pro +', 'Plan LinkedIn 30j', 'API access', '10 GB stockage']} />
          </div>
          <Link href="/pricing" className="text-primary hover:underline mt-6 inline-block">
            Voir le détail des plans →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à booster votre carrière ?</h2>
          <p className="text-secondary mb-8">
            Rejoignez des milliers de professionnels qui prennent soin de leur carrière.
          </p>
          <Link href="/register" className="btn btn-primary btn-lg">
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>
    </div>
  );
}

function PillarCard({ icon, name, color }: { icon: string; name: string; color: string }) {
  return (
    <div className="card text-center py-6">
      <div
        className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      <p className="font-medium text-sm">{name}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card">
      <span className="text-3xl mb-4 block">{icon}</span>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-secondary text-sm">{description}</p>
    </div>
  );
}

function PricingCard({ plan, price, features, featured }: { plan: string; price: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`card ${featured ? 'border-primary ring-2 ring-primary/20' : ''}`}>
      {featured && <span className="badge pill-pro mb-4">Populaire</span>}
      <h3 className="text-xl font-bold">{plan}</h3>
      <div className="my-4">
        <span className="text-3xl font-bold">{price === '0' ? 'Gratuit' : `${price}€`}</span>
        {price !== '0' && <span className="text-muted">/mois</span>}
      </div>
      <ul className="space-y-2 text-sm text-secondary">
        {features.map((f, i) => (
          <li key={i}>✓ {f}</li>
        ))}
      </ul>
    </div>
  );
}
