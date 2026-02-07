import Link from 'next/link';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '3 analyses CV / mois',
      '1 portfolio (templates gratuits)',
      '10 offres matchées / mois',
      '100 MB stockage',
    ],
    limits: [
      'Pas d\'export PDF',
      'Pas d\'analytics',
      'Support email uniquement',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    popular: true,
    features: [
      'Analyses CV illimitées',
      'Portfolios illimités',
      'Tous les templates',
      'Offres matchées illimitées',
      '1 GB stockage',
      'Export PDF',
      'Analytics avancées',
      'Support prioritaire',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 29.99,
    features: [
      'Tout le plan Pro',
      'Plan LinkedIn 30 jours',
      'Coaching personnalisé',
      'API access',
      '10 GB stockage',
      'Support dédié',
    ],
  },
];

export default function SubscriptionPage() {
  const currentPlan = 'free';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Abonnement</h1>
        <p className="text-secondary mt-1">
          Gérez votre plan et votre facturation
        </p>
      </div>

      {/* Current Plan */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Plan actuel</h2>
            <p className="text-secondary">
              Vous êtes sur le plan <span className="font-medium text-primary">Free</span>
            </p>
          </div>
          <span className="badge pill-free text-lg px-4 py-2">Free</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge pill-pro">
                Populaire
              </span>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">
                  {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
                </span>
                {plan.price > 0 && <span className="text-muted"> / mois</span>}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
              {plan.limits?.map((limit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span>✗</span>
                  <span>{limit}</span>
                </li>
              ))}
            </ul>

            {currentPlan === plan.id ? (
              <button className="btn btn-secondary w-full" disabled>
                Plan actuel
              </button>
            ) : (
              <button
                className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.price === 0 ? 'Rétrograder' : 'Upgrader'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="card">
        <h3 className="font-semibold mb-4">Questions fréquentes</h3>
        <div className="space-y-4">
          <details className="group">
            <summary className="cursor-pointer font-medium">
              Puis-je changer de plan à tout moment ?
            </summary>
            <p className="mt-2 text-secondary text-sm">
              Oui, vous pouvez upgrader ou downgrader votre plan à tout moment.
              Les changements prennent effet immédiatement.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium">
              Comment annuler mon abonnement ?
            </summary>
            <p className="mt-2 text-secondary text-sm">
              Vous pouvez annuler à tout moment depuis cette page.
              Votre accès reste actif jusqu'à la fin de la période payée.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
