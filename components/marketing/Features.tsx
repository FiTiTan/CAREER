export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
          <path d="M14 2v6h6M16 13H8m8 4H8m2-8H8"/>
        </svg>
      ),
      title: 'CV Coach IA',
      description: 'Analyse approfondie avec scoring BMAD et recommandations actionnables.',
      color: 'teal',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 5h16M4 12h16M4 19h16"/>
        </svg>
      ),
      title: 'Portfolio Builder',
      description: 'Créez un portfolio professionnel en quelques clics avec nos templates.',
      color: 'violet',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      ),
      title: 'Job Matching',
      description: 'Trouvez les opportunités qui correspondent vraiment à votre profil.',
      color: 'amber',
    },
  ]

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4">
            Une suite <span className="text-[#7C3AED]">complète</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Tous les outils pour optimiser votre présence professionnelle
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const bgClass = feature.color === 'teal' ? 'bg-[var(--accent-teal-bg)]' : feature.color === 'violet' ? 'bg-[var(--accent-violet-bg)]' : 'bg-[var(--accent-amber-bg)]'
            const textClass = feature.color === 'teal' ? 'text-[#0D9488]' : feature.color === 'violet' ? 'text-[#7C3AED]' : 'text-[#D97706]'
            
            return (
              <div
                key={i}
                className="bg-bg-secondary border border-border-light rounded-2xl p-8 hover:shadow-lg transition-calm"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${bgClass} ${textClass}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
