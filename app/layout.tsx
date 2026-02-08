import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CareerCare — Prenez soin de votre carrière',
  description: 'Optimisez votre CV, créez votre portfolio, boostez votre LinkedIn et trouvez le job idéal — le tout alimenté par l\'IA.',
  keywords: ['carrière', 'CV', 'portfolio', 'LinkedIn', 'job', 'emploi', 'IA'],
  authors: [{ name: 'CareerCare' }],
  creator: 'CareerCare',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://careercare.io'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://careercare.io',
    siteName: 'CareerCare',
    title: 'CareerCare — Prenez soin de votre carrière',
    description: 'Optimisez votre CV, créez votre portfolio, boostez votre LinkedIn et trouvez le job idéal.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerCare — Prenez soin de votre carrière',
    description: 'Optimisez votre CV, créez votre portfolio, boostez votre LinkedIn et trouvez le job idéal.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CareerCare',
  },
};

export const viewport: Viewport = {
  themeColor: '#00d4aa',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        
        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('SW registered:', reg.scope))
                    .catch(err => console.log('SW registration failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
