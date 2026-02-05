import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Prêt à booster votre carrière ?
        </h2>
        <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
          Rejoignez des milliers de professionnels qui utilisent CareerCare pour prendre le contrôle de leur évolution professionnelle.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cv/new"
            className="px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            Analyser mon CV gratuitement
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 rounded-full border border-neutral-600 hover:border-neutral-500 text-white font-medium transition-colors"
          >
            Voir les fonctionnalités
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>Données chiffrées</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span>Résultats en 30s</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>+2,000 utilisateurs</span>
          </div>
        </div>
      </div>
    </section>
  )
}
