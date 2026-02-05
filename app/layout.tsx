import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareerCare — Prenez soin de votre carrière',
  description: 'Le premier Career OS français. Analysez votre CV en 30 secondes et obtenez des recommandations personnalisées.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
