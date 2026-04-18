import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { Navigation } from '@/components/common/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AURA - AI Prompt Gallery',
  description: 'Discover and copy beautiful AI-generated prompts for your creative projects.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter bg-aura-white text-aura-black`}>
        <AuthProvider>
          <Navigation />
          <div className="pt-16 md:pt-20">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
