import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-pill bg-accent-teal-bg mb-8">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span className="text-sm font-medium text-accent-teal">
            Le premier Career OS français
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
          Prenez soin de votre <span className="text-accent-teal">carrière</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Analysez votre CV en 30 secondes. Obtenez un diagnostic complet et des recommandations personnalisées pour booster votre carrière.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/cv/new"
            className="px-8 py-4 rounded-pill bg-anthracite text-white font-medium hover:bg-anthracite transition-calm inline-flex items-center justify-center gap-2"
          >
            Analyser mon CV
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 rounded-pill border border-border-DEFAULT bg-bg-secondary hover:bg-bg-tertiary transition-calm font-medium"
          >
            En savoir plus
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-8 text-sm text-text-tertiary">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <span>100% gratuit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <span>Sans inscription</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <span>RGPD compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}
