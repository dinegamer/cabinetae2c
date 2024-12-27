import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AE2C - Cabinet d\'Expertise Comptable',
  description: 'AE2C - Notre expertise au service de votre succès',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} font-inter bg-gray-100`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 bg-white/80 shadow-xl rounded-lg my-4">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

