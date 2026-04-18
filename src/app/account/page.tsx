'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, CreditCard, Clock, ChevronRight, LogOut, Copy, ExternalLink, Sparkles, Zap, Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { isUserPro } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()
  const [savedPrompts, setSavedPrompts] = useState<any[]>([])
  const [fetchingSaved, setFetchingSaved] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
    if (user) {
      fetchSavedPrompts()
    }
  }, [user, loading])

  async function fetchSavedPrompts() {
    setFetchingSaved(true)
    const { data, error } = await supabase
      .from('saved_prompts')
      .select(`
        *,
        prompts (*)
      `)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      // Filter out any entries where the prompt might have been deleted
      setSavedPrompts(data.filter((item: any) => item.prompts))
    }
    setFetchingSaved(false)
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aura-white">
        <div className="w-12 h-12 border-4 border-aura-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  } as any

  return (
    <main className="min-h-screen bg-aura-white pt-32 pb-40 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Profile Header */}
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-center gap-8 p-10 bg-white border border-aura-light-gray rounded-[48px] shadow-sm">
          <div className="w-32 h-32 rounded-full bg-aura-light-gray flex items-center justify-center text-aura-gray overflow-hidden">
            <User size={64} />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-aura-black">
              {profile?.name || user.email?.split('@')[0]}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4 text-aura-gray font-medium">
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {user.email}
              </span>
              <span className="hidden md:inline text-aura-light-gray">•</span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => signOut()} className="h-12 px-6">
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Account Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="p-8 bg-aura-black text-white rounded-[40px] shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Subscription</h3>
                  <Zap size={20} className={isUserPro(profile) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter uppercase">{profile?.plan || 'Free'}</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 w-full relative z-10" />

              <div className="space-y-4 relative z-10">
                {isUserPro(profile) ? (
                  <>
                    <p className="text-white/60 font-medium text-sm italic">Next renewal: {new Date(profile?.subscription_end || '').toLocaleDateString()}</p>
                    <Button className="bg-white text-aura-black hover:bg-white/90" fullWidth>Manage Billing</Button>
                  </>
                ) : (
                  <>
                    <p className="text-white/60 font-medium text-sm">Unlock 5,000+ premium prompts and high-res examples.</p>
                    <Button className="bg-white text-aura-black hover:bg-white/90" fullWidth>
                      <Link href="/pricing" className="flex items-center gap-2">Upgrade to Pro <ChevronRight size={16} /></Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="p-8 bg-white border border-aura-light-gray rounded-[40px] space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CreditCard size={20} />
                Payment Method
              </h3>
              <p className="text-aura-gray font-medium">No active payment methods found. Payments are handled securely via Razorpay.</p>
            </motion.div>
          </div>

          {/* Right Column: Saved Prompts */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Heart size={28} className="text-red-500 fill-red-500" />
                Saved Prompts
              </h2>
              <span className="px-4 py-1.5 bg-aura-light-gray rounded-full text-sm font-bold text-aura-gray">
                {savedPrompts.length} Prompts
              </span>
            </motion.div>

            {fetchingSaved ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-aura-light-gray animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : savedPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPrompts.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group bg-white border border-aura-light-gray rounded-3xl p-4 flex items-center gap-4 hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-aura-light-gray overflow-hidden shrink-0">
                      <img src={item.prompts.example_image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-bold text-aura-black truncate">{item.prompts.name}</h4>
                      <p className="text-xs text-aura-gray font-medium uppercase tracking-widest">{item.prompts.category}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link href={`/p/${item.prompts.slug}`}>
                        <div className="w-10 h-10 rounded-full bg-aura-light-gray flex items-center justify-center text-aura-black hover:bg-aura-black hover:text-white transition-all">
                          <ExternalLink size={16} />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-aura-light-gray/20 rounded-[48px] border border-dashed border-aura-light-gray space-y-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-aura-gray shadow-sm">
                  <Sparkles size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">No saved prompts yet</h3>
                  <p className="text-aura-gray font-medium">Your collection is empty. Start exploring the gallery!</p>
                </div>
                <Button size="lg" className="h-14 px-8">
                  <Link href="/gallery">Browse Gallery</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
