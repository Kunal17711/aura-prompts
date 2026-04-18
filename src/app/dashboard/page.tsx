'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/common/Navigation'

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <svg className="w-12 h-12 animate-spin text-aura-black" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <main className="min-h-screen bg-aura-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-aura-black mb-2">
            {greeting}, {profile?.name || 'there'}
          </h1>
          <p className="text-aura-gray text-lg">Welcome back to AURA</p>
        </div>

        {/* Plan Badge */}
        <div className="mb-8">
          <div className="inline-block">
            <div className={`px-6 py-3 rounded-pill font-semibold text-lg ${
              profile?.plan === 'pro' 
                ? 'bg-aura-black text-white' 
                : 'bg-aura-light-gray text-aura-black'
            }`}>
              {profile?.plan === 'pro' ? '⭐ Pro Member' : 'Free Plan'}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a href="/gallery" className="p-8 border border-aura-light-gray rounded-3xl hover:shadow-lg transition-all hover:bg-aura-light-gray">
            <h3 className="font-semibold text-aura-black text-lg mb-2">Browse Gallery</h3>
            <p className="text-aura-gray">Discover amazing prompts</p>
          </a>

          <a href="/saved" className="p-8 border border-aura-light-gray rounded-3xl hover:shadow-lg transition-all hover:bg-aura-light-gray">
            <h3 className="font-semibold text-aura-black text-lg mb-2">My Saved Prompts</h3>
            <p className="text-aura-gray">View your collection</p>
          </a>
        </div>

        {profile?.plan === 'free' && (
          <div className="bg-gradient-to-r from-aura-light-gray to-gray-100 rounded-3xl p-12 text-center border border-aura-light-gray">
            <h3 className="text-3xl font-bold text-aura-black mb-4">Upgrade to Pro</h3>
            <p className="text-aura-gray text-lg mb-8">Unlock premium prompts and unlimited access</p>
            <Button onClick={() => router.push('/pricing')} size="lg">
              View Pricing
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
