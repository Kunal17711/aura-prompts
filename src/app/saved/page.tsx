'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, SearchX, Sparkles, ChevronLeft, LayoutGrid, Image as ImageIcon, Lock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { isUserPro } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SavedPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [savedItems, setSavedItems] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
    if (user) {
      fetchSaved()
    }
  }, [user, loading])

  async function fetchSaved() {
    setFetching(true)
    const { data, error } = await supabase
      .from('saved_prompts')
      .select(`
        *,
        prompts (*)
      `)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setSavedItems(data.filter((item: any) => item.prompts))
    }
    setFetching(false)
  }

  const handleUnsave = async (promptId: string) => {
    const { error } = await supabase
      .from('saved_prompts')
      .delete()
      .eq('user_id', user?.id)
      .eq('prompt_id', promptId)

    if (!error) {
      setSavedItems(prev => prev.filter(item => item.prompt_id !== promptId))
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aura-white">
        <div className="w-12 h-12 border-4 border-aura-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-aura-white pt-32 pb-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 text-aura-gray hover:text-aura-black transition-all font-bold group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-aura-black flex items-center gap-4">
                Saved <span className="text-aura-gray">Prompts</span>
              </h1>
              <p className="text-xl text-aura-gray max-w-xl font-medium">
                Your personal collection of AI masterpieces and creative triggers.
              </p>
            </div>
            <div className="px-6 py-3 bg-white border border-aura-light-gray rounded-2xl shadow-sm flex items-center gap-3">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <span className="font-bold text-aura-black">{savedItems.length} Saved</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {fetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[4/5] bg-aura-light-gray animate-pulse rounded-[32px]" />
            ))}
          </div>
        ) : savedItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {savedItems.map((item) => (
                <SavedCard 
                  key={item.id} 
                  prompt={item.prompts} 
                  isPro={!item.prompts.is_free && !isUserPro(profile)} 
                  onUnsave={() => handleUnsave(item.prompt_id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-40 text-center space-y-8 bg-white rounded-[48px] border border-dashed border-aura-light-gray">
            <div className="w-24 h-24 bg-aura-light-gray/30 rounded-full flex items-center justify-center mx-auto text-aura-gray">
              <Sparkles size={40} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-aura-black">Your collection is empty</h3>
              <p className="text-xl text-aura-gray font-medium max-w-md mx-auto">
                Explore the gallery and heart your favorite prompts to see them here.
              </p>
            </div>
            <Button size="lg" className="h-16 px-10 text-lg">
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

function SavedCard({ prompt, isPro, onUnsave }: { prompt: any, isPro: boolean, onUnsave: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group relative bg-white rounded-[32px] overflow-hidden border border-aura-light-gray hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col"
    >
      <Link href={`/p/${prompt.slug}`} className="block relative aspect-[4/5] overflow-hidden">
        <img 
          src={prompt.example_image_url} 
          alt={prompt.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isPro ? 'blur-2xl' : ''}`}
        />

        {/* Unsave Button */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onUnsave()
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all active:scale-90"
        >
          <Heart size={20} className="fill-red-500 text-red-500" />
        </button>

        {isPro && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center space-y-2">
            <Lock size={20} />
            <p className="font-bold text-xs uppercase tracking-widest">Pro Only</p>
          </div>
        )}
      </Link>

      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-aura-gray">
            {prompt.category}
          </span>
          {!prompt.is_free && (
            <span className="bg-aura-black text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
              PRO
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-aura-black group-hover:text-aura-gray transition-colors">
          <Link href={`/p/${prompt.slug}`}>{prompt.name}</Link>
        </h3>
      </div>
    </motion.div>
  )
}
