import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#CCFBF1' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span className="text-sm font-medium text-[#0D9488]">
            Le premier Career OS français
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
          Prenez soin de votre <span className="text-[#0D9488]">carrière</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Analysez votre CV en 30 secondes. Obtenez un diagnostic complet et des recommandations personnalisées pour booster votre carrière.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cv/new"
            className="px-8 py-4 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-800-hover transition-calm"
          >
            Analyser mon CV gratuitement
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-calm font-medium"
          >
            En savoir plus
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>100% gratuit</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Sans inscription</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>RGPD compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}
