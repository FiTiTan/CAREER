import Hero from '@/components/marketing/Hero'
import Features from '@/components/marketing/Features'
import CTA from '@/components/marketing/CTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}
