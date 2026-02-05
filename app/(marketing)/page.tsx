import Header from '@/components/marketing/Header'
import Hero from '@/components/marketing/Hero'
import Features from '@/components/marketing/Features'
import CTA from '@/components/marketing/CTA'
import Footer from '@/components/marketing/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
