'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Star, Shield, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PricingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  } as any

  return (
    <main className="min-h-screen bg-aura-white pt-32 pb-40 px-4">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-aura-light-gray rounded-full text-xs font-black uppercase tracking-widest text-aura-gray">
            <Star size={14} className="text-aura-black" />
            Simple Transparent Pricing
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-aura-black leading-[0.9]">
            The power to create <br />
            <span className="text-aura-gray">without limits.</span>
          </h1>
          <p className="text-xl md:text-2xl text-aura-gray max-w-2xl mx-auto font-medium">
            Join the AURA Pro community and unlock the world's most premium AI prompt library.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Free Plan */}
          <motion.div 
            {...fadeInUp}
            className="p-12 rounded-[56px] border border-aura-light-gray bg-white space-y-12 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">Free</h3>
                <p className="text-aura-gray font-medium">Explore the basics and start your creative journey.</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-bold tracking-tighter">₹0</span>
                <span className="text-aura-gray font-bold uppercase tracking-widest text-xs">per month</span>
              </div>
              <div className="h-[1px] bg-aura-light-gray w-full" />
              <ul className="space-y-6">
                {[
                  'Access 100+ Free Prompts',
                  'Standard Resolution Images',
                  'Basic Search & Filters',
                  'Unlimited Image Browsing',
                  'Community Access'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-aura-black font-semibold">
                    <div className="w-6 h-6 rounded-full bg-aura-light-gray flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="secondary" size="lg" className="h-16 text-lg" fullWidth>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            {...fadeInUp}
            className="p-12 rounded-[56px] bg-aura-black text-white space-y-12 flex flex-col justify-between relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)]"
          >
            <div className="absolute top-10 right-10">
              <div className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-xs font-black tracking-widest uppercase">
                Best Value
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">Pro</h3>
                <p className="text-white/60 font-medium">Unlock the full potential of high-end AI generations.</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-bold tracking-tighter text-white">₹79</span>
                <span className="text-white/40 font-bold uppercase tracking-widest text-xs">per month</span>
              </div>
              <div className="h-[1px] bg-white/10 w-full" />
              <ul className="space-y-6">
                {[
                  'Access 5000+ Premium Prompts',
                  'Unlock All Hidden Prompt Texts',
                  'High Resolution Masterpieces',
                  'One-Click Save to Library',
                  'Early Access to New Drops',
                  'Priority Support'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-white font-semibold">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 text-aura-black">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button size="lg" className="h-16 text-lg bg-white text-aura-black hover:bg-white/90" fullWidth>
              <Link href="/checkout">Upgrade to Pro</Link>
            </Button>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Zap size={24} />, title: 'Instant Access', desc: 'Get your pro access immediately after successful payment.' },
            { icon: <Shield size={24} />, title: 'Secure Payment', desc: 'Encrypted transactions powered by Razorpay. Safe and sound.' },
            { icon: <HelpCircle size={24} />, title: 'Priority Support', desc: 'Get answers to your creative questions within hours.' }
          ].map((benefit, i) => (
            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="space-y-4 p-8 rounded-[40px] bg-aura-light-gray/20 border border-aura-light-gray">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-aura-black shadow-sm">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-bold">{benefit.title}</h4>
              <p className="text-aura-gray font-medium leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto space-y-12 pt-20">
          <motion.div {...fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Common Questions</h2>
            <p className="text-xl text-aura-gray">Everything you need to know about AURA Pro.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription from your dashboard at any time. You will retain access until the end of your billing cycle.' },
              { q: 'What models are these prompts for?', a: 'Our prompts are specifically engineered for Midjourney v6, DALL-E 3, and Stable Diffusion XL.' },
              { q: 'Is it a one-time payment?', a: 'Currently, AURA Pro is a monthly subscription. This helps us keep the library fresh with new content daily.' },
              { q: 'Do you offer a free trial?', a: 'We have a free plan that lets you access hundreds of high-quality prompts to test the platform.' }
            ].map((faq, idx) => (
              <motion.details 
                key={idx}
                {...fadeInUp}
                className="group bg-white rounded-3xl border border-aura-light-gray overflow-hidden cursor-pointer"
              >
                <summary className="p-8 flex items-center justify-between font-bold text-xl list-none">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-aura-light-gray flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ArrowRight size={18} className="rotate-90" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-aura-gray text-lg leading-relaxed font-medium">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
