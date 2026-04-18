'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { isUserPro } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Copy, Check, ChevronLeft, Lock, Sparkles, Image as ImageIcon, Info, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'

interface PromptDetailClientProps {
  prompt: any
  similarPrompts: any[]
}

export function PromptDetailClient({ prompt, similarPrompts }: PromptDetailClientProps) {
  const router = useRouter()
  const { user, profile } = useAuth()
  
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user && prompt) checkIfSaved()
  }, [user, prompt])

  async function checkIfSaved() {
    const { data } = await supabase
      .from('saved_prompts')
      .select('id')
      .eq('user_id', user?.id)
      .eq('prompt_id', prompt.id)
      .single()
    
    if (data) setSaved(true)
  }

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) return router.push('/auth/login')
    
    try {
      const action = saved ? 'unsave' : 'save'
      const res = await fetch('/api/save-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, promptId: prompt.id, action })
      })
      
      if (!res.ok) throw new Error('Failed to save')
      setSaved(!saved)
    } catch (err) {
      console.error('Save toggle failed:', err)
      alert('Failed to save. Please try again.')
    }
  }

  const handleCopy = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (!prompt.is_free && !isUserPro(profile)) {
      router.push('/pricing')
      return
    }

    navigator.clipboard.writeText(prompt.prompt_text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    
    // Save to history/saved prompts silently
    const { error } = await supabase.from('saved_prompts').insert({
      user_id: user.id,
      prompt_id: prompt.id
    })
    
    if (!error) {
      setSaved(true)
    }
  }

  if (!prompt) return null

  const isLocked = !prompt.is_free && !isUserPro(profile)

  return (
    <main className="min-h-screen bg-aura-white pt-24 pb-20 md:pt-32 md:pb-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Navigation */}
        <Link 
          href="/gallery" 
          className="inline-flex items-center gap-2 text-aura-gray hover:text-aura-black transition-all font-bold group"
        >
          <div className="w-8 h-8 rounded-full bg-aura-light-gray flex items-center justify-center group-hover:bg-aura-black group-hover:text-white transition-all">
            <ChevronLeft size={18} />
          </div>
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl bg-aura-light-gray border border-aura-light-gray"
          >
            <img 
              src={prompt.example_image_url} 
              alt={prompt.name}
              className={`w-full h-full object-cover ${isLocked ? 'blur-3xl scale-110' : ''}`}
            />

            {/* Heart Button */}
            {!isLocked && (
                <button 
                  onClick={handleToggleSave}
                  className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all active:scale-90 shadow-2xl"
                >
                  <Heart size={24} className={saved ? "fill-red-500 text-red-500" : ""} />
                </button>
            )}

            {isLocked && (
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <Lock size={32} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Pro Access Only</h2>
                  <p className="text-white/80 max-w-xs mx-auto">This premium prompt is only available for AURA Pro members.</p>
                </div>
                <Button size="lg" className="bg-white text-aura-black hover:bg-white/90 px-10 h-14">
                  <Link href="/pricing">Upgrade to Pro</Link>
                </Button>
              </div>
            )}
          </motion.div>

          {/* Right: Info Container */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12 lg:sticky lg:top-32"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-aura-light-gray rounded-full text-xs font-black uppercase tracking-widest">
                  {prompt.category}
                </span>
                {!prompt.is_free && (
                  <span className="px-4 py-1.5 bg-aura-black text-white rounded-full text-xs font-black tracking-widest">
                    PRO
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-aura-black leading-none">
                {prompt.name}
              </h1>
              <p className="text-xl text-aura-gray leading-relaxed max-w-xl">
                {prompt.description || 'A stunning AI-generated piece of art. High detail, cinematic lighting, and perfect composition.'}
              </p>
            </div>

            {/* Prompt Box */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-aura-gray font-bold uppercase tracking-widest text-xs">
                  <Sparkles size={14} />
                  The Prompt
                </div>
                {isLocked && (
                  <div className="flex items-center gap-2 text-aura-black font-bold text-xs uppercase bg-aura-light-gray/50 px-3 py-1 rounded-full">
                    <Lock size={12} />
                    Locked
                  </div>
                )}
              </div>

              <div className="relative group">
                <div className={`w-full p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-aura-light-gray transition-all ${isLocked ? 'blur-md select-none' : ''}`}>
                  <p className="text-base md:text-lg font-mono leading-relaxed text-aura-black">
                    {isLocked 
                      ? "This prompt text is hidden for free users. Upgrade to Pro to copy and use it in your favorite AI tools like Midjourney or DALL-E." 
                      : prompt.prompt_text
                    }
                  </p>
                </div>
                
                {!isLocked && (
                  <Button 
                    onClick={handleCopy}
                    className="absolute bottom-6 right-6 h-12 px-6 shadow-xl"
                  >
                    {copied ? (
                      <span className="flex items-center gap-2"><Check size={18} /> Copied!</span>
                    ) : (
                      <span className="flex items-center gap-2"><Copy size={18} /> Copy Prompt</span>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Meta Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-aura-light-gray/50 rounded-2xl text-sm font-semibold text-aura-gray">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {!isLocked && (
              <div className="flex items-center gap-4 p-6 bg-blue-50/50 border border-blue-100 rounded-3xl">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
                  <Info size={20} />
                </div>
                <p className="text-sm text-blue-800 font-medium">
                  This prompt works best with <strong>Midjourney v6</strong> or <strong>DALL-E 3</strong>. Use 16:9 aspect ratio for best results.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Similar Prompts */}
        {similarPrompts.length > 0 && (
          <section className="space-y-12 pt-20 border-t border-aura-light-gray">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tight">Similar Prompts</h2>
                <p className="text-aura-gray font-medium">Explore more prompts in the {prompt.category} category.</p>
              </div>
              <Link href="/gallery" className="font-bold flex items-center gap-2 group">
                View all <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarPrompts.map((p) => (
                <Link key={p.id} href={`/p/${p.slug}`} className="group space-y-4">
                  <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-aura-light-gray">
                    <img 
                      src={p.example_image_url} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="text-xl font-bold group-hover:text-aura-gray transition-colors">{p.name}</h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
