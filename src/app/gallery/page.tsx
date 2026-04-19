'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, Filter, SlidersHorizontal, Lock, ImageIcon, Sparkles, ChevronRight, SearchX, Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { isUserPro } from '@/lib/auth'
import Link from 'next/link'

export default function GalleryPage() {
  const router = useRouter()
  const { profile } = useAuth()
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Portrait', 'Fashion', 'Cinematic', 'Fantasy', 'Architecture', 'Indian']

  useEffect(() => {
    fetchPrompts()
  }, [])

  async function fetchPrompts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPrompts(data)
    }
    setLoading(false)
  }

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-aura-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-aura-black">Gallery</h1>
            <p className="text-xl text-aura-gray max-w-xl">
              Explore our curated collection of high-end AI prompts.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-aura-gray group-focus-within:text-aura-black transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search prompts or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-aura-light-gray rounded-full focus:ring-4 focus:ring-aura-black/5 focus:border-aura-black/20 outline-none transition-all shadow-sm group-hover:shadow-md"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          <div className="p-1 bg-aura-light-gray/50 rounded-full flex items-center gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-white text-aura-black shadow-sm' 
                    : 'text-aura-gray hover:text-aura-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-[4/5] bg-aura-light-gray animate-pulse rounded-[32px]" />
            ))}
          </div>
        ) : filteredPrompts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} isPro={!prompt.is_free && !isUserPro(profile)} router={router} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-40 text-center space-y-6 bg-white rounded-[48px] border border-dashed border-aura-light-gray">
            <div className="w-20 h-20 bg-aura-light-gray/30 rounded-full flex items-center justify-center mx-auto text-aura-gray">
              <SearchX size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">No prompts found</h3>
              <p className="text-aura-gray">Try adjusting your search or category filters.</p>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-aura-black font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

function PromptCard({ prompt, isPro, router }: { prompt: any, isPro: boolean, router: any }) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) checkIfSaved()
  }, [user])

  async function checkIfSaved() {
    const { data } = await supabase
      .from('saved_prompts')
      .select('id')
      .eq('user_id', user?.id)
      .eq('prompt_id', prompt.id)
      .single()
    
    if (data) setSaved(true)
  }

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      router.push('/auth/login')
      return
    }
    
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const action = saved ? 'unsave' : 'save'
      const res = await fetch('/api/save-prompt', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ promptId: prompt.id, action })
      })
      
      if (!res.ok) throw new Error('Failed to save')
      setSaved(!saved)
    } catch (err) {
      console.error('Save toggle failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
    >
      <Link href={`/p/${prompt.slug}`} className="block relative aspect-[4/5] overflow-hidden">
        {/* Image */}
        <img 
          src={prompt.example_image_url} 
          alt={prompt.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isPro ? 'blur-2xl' : ''}`}
        />

        {/* Heart Icon */}
        <button 
          onClick={toggleSave}
          disabled={loading}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all active:scale-90"
        >
          <Heart size={18} className={saved ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* PRO badge — top left */}
        {!prompt.is_free && (
          <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-aura-black text-[9px] px-3 py-1 rounded-full font-black tracking-wider">
            PRO
          </span>
        )}

        {/* Pro Lock overlay */}
        {isPro && (
          <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
              <Lock size={20} />
            </div>
            <p className="font-bold tracking-tight text-sm uppercase">PRO ACCESS ONLY</p>
          </div>
        )}

        {/* Hover overlay — slides up with name, description */}
        {!isPro && (
          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 p-5 space-y-1.5 translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <span className="block text-[10px] font-black uppercase tracking-widest text-white/50">
                {prompt.category}
              </span>
              <h3 className="text-white font-bold text-base leading-snug">{prompt.name}</h3>
              {prompt.description && (
                <p className="text-white/65 text-xs leading-relaxed line-clamp-2">{prompt.description}</p>
              )}
              <div className="flex items-center gap-1 text-white/80 text-[11px] font-bold pt-1">
                <Sparkles size={11} />
                View Prompt
                <ChevronRight size={11} />
              </div>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
