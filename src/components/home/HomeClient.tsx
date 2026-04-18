'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, Image as ImageIcon, Search, Lock, Plus, ChevronRight, Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { isUserPro } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export function HomeClient({ initialPrompts }: { initialPrompts: any[] }) {
  const { profile } = useAuth()
  // Use initialPrompts to render instantly, no loading state needed!
  const [featuredPrompts] = useState<any[]>(initialPrompts || [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  } as any

  const steps = [
    {
      icon: <ImageIcon size={24} />,
      title: 'Browse',
      desc: 'Explore a curated gallery of stunning AI-generated art.'
    },
    {
      icon: <Copy size={24} />,
      title: 'Copy',
      desc: 'Get the exact prompt used to create the image with one click.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Create',
      desc: 'Paste into your favorite AI tool and generate your own magic.'
    }
  ]

  return (
    <main className="min-h-screen bg-aura-white text-aura-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-aura-light-gray rounded-full text-xs font-black uppercase tracking-widest text-aura-gray"
          >
            <Sparkles size={14} className="text-aura-black" />
            The Future of Prompt Engineering
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tight text-aura-black leading-[0.9]"
          >
            Create <span className="text-aura-gray">Masterpieces</span> <br className="hidden sm:block" /> 
            with AURA AI.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-aura-gray max-w-2xl mx-auto font-medium"
          >
            Unlock the world's most premium library of AI-generated prompts for Midjourney, DALL-E 3, and beyond.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 w-full sm:w-auto"
          >
            <Button size="lg" className="h-16 px-10 text-lg group w-full sm:w-auto">
              <Link href="/gallery" className="flex items-center justify-center gap-2">
                Explore Gallery <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="h-16 px-10 text-lg w-full sm:w-auto">
              <Link href="/pricing">View Pro Plans</Link>
            </Button>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-aura-light-gray/20 to-transparent rounded-full -z-10 blur-3xl" />
      </section>

      {/* How it Works Section */}
      <section className="py-20 md:py-40 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">How it works</h2>
            <p className="text-xl text-aura-gray max-w-2xl mx-auto">Simple, elegant, and powerful. Just like your ideas.</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[2px] bg-aura-light-gray/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-aura-black"
              />
            </div>
            
            {/* Timeline Line (Mobile) */}
            <div className="md:hidden absolute top-[10%] bottom-[10%] left-6 w-[2px] bg-aura-light-gray/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-aura-black"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative z-10">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.3 }}
                  className="group flex flex-col md:items-center text-left md:text-center relative pl-16 md:pl-0"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.3 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute md:relative left-0 top-0 w-12 h-12 rounded-2xl bg-white border-2 border-aura-light-gray group-hover:border-aura-black flex items-center justify-center text-aura-black group-hover:scale-110 transition-all duration-500 shadow-sm z-10"
                  >
                    {step.icon}
                  </motion.div>
                  <div className="space-y-4 pt-2 md:pt-8">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-aura-gray text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="py-20 md:py-40 px-4 bg-aura-light-gray/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div {...fadeInUp} className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-aura-black">Featured Drops</h2>
              <p className="text-xl text-aura-gray max-w-xl">
                The latest high-end prompts added to our collection this week.
              </p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Link href="/gallery" className="font-bold flex items-center gap-2 group text-lg hover:gap-4 transition-all">
                View entire gallery <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {featuredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPrompts.map((prompt, i) => (
                <motion.div 
                  key={prompt.id}
                  {...fadeInUp}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-[32px] overflow-hidden border border-aura-light-gray hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                >
                  <Link href={`/p/${prompt.slug}`}>
                    <div className="aspect-[4/5] bg-aura-light-gray overflow-hidden">
                      <img 
                        src={prompt.example_image_url} 
                        alt={prompt.name}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!prompt.is_free && !isUserPro(profile) ? 'blur-2xl' : ''}`}
                      />
                    </div>
                    <div className="p-8 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-aura-gray">{prompt.category}</span>
                        {!prompt.is_free && <span className="bg-aura-black text-white text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>}
                      </div>
                      <h4 className="text-xl font-bold">{prompt.name}</h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              {...fadeInUp}
              className="py-20 text-center space-y-6 bg-white rounded-[40px] border border-dashed border-aura-light-gray"
            >
              <div className="w-16 h-16 bg-aura-light-gray rounded-full flex items-center justify-center mx-auto text-aura-gray">
                <ImageIcon size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">The Library is Empty</h3>
                <p className="text-aura-gray">No prompts have been uploaded to the database yet.</p>
              </div>
              <Button size="lg">
                <Link href="/aura-admin-kunal-2010-secret-v93-82739487239487239487234/prompts/new" className="flex items-center gap-2">
                  <Plus size={20} /> Upload First Prompt
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-40 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Choose your path</h2>
            <p className="text-xl text-aura-gray max-w-2xl mx-auto">Start for free, or unlock the full potential of AURA.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              {...fadeInUp}
              className="p-10 rounded-[40px] border border-aura-light-gray bg-aura-light-gray/20 space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">₹0</span>
                  <span className="text-aura-gray font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4">
                {['Access free prompts', 'Standard resolution', 'Community support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-aura-black font-medium">
                    <div className="w-5 h-5 rounded-full bg-aura-black flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button variant="secondary" fullWidth size="lg" className="h-14">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              {...fadeInUp}
              className="p-10 rounded-[40px] bg-aura-black text-white space-y-8 relative overflow-hidden shadow-2xl shadow-black/20"
            >
              <div className="absolute top-6 right-6 px-4 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase">
                Most Popular
              </div>
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">₹79</span>
                  <span className="text-white/60 font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4 relative z-10">
                {['Unlimited access', 'Pro-only prompts', 'High resolution', 'Early access', 'Priority support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-aura-black">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button fullWidth size="lg" className="h-14 bg-white text-aura-black hover:bg-white/90 relative z-10">
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-40 px-4 bg-aura-light-gray/30">
        <div className="max-w-3xl mx-auto space-y-16">
          <motion.div {...fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Questions?</h2>
            <p className="text-xl text-aura-gray">Everything you need to know about AURA.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Can I use these prompts commercially?', a: 'Yes, all prompts on AURA are licensed for commercial use. You own what you create.' },
              { q: 'How often is the gallery updated?', a: 'We add new, hand-picked prompts every single day to keep your creative spark alive.' },
              { q: 'Can I cancel my Pro subscription?', a: 'Absolutely. You can cancel at any time from your billing dashboard with one click.' },
              { q: 'Which AI models are supported?', a: 'Our prompts are optimized for Midjourney v6, DALL-E 3, and Stable Diffusion XL.' }
            ].map((faq, idx) => (
              <motion.details 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-3xl border border-aura-light-gray overflow-hidden cursor-pointer"
              >
                <summary className="p-8 flex items-center justify-between font-bold text-xl list-none">
                  {faq.q}
                  <ChevronRight size={24} className="text-aura-gray group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <div className="px-8 pb-8 text-aura-gray text-lg leading-relaxed font-medium">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
