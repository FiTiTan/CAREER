import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-accent-teal to-accent-violet rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Prêt à booster votre carrière ?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui ont déjà amélioré leur CV avec CareerCare.
          </p>
          <Link
            href="/cv/new"
            className="inline-block px-8 py-4 rounded-pill bg-white text-anthracite font-medium hover:bg-gray-100 transition-calm"
          >
            Commencer gratuitement
          </Link>
        </div>
      </div>
    </section>
  )
}
