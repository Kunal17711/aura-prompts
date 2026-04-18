'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for exploring the possibilities of AI.',
    features: [
      'Access to 20+ free prompts',
      'Community discord access',
      'Daily curated drops',
      'Personal use only'
    ],
    cta: 'Get Started',
    href: '/auth/signup',
    popular: false
  },
  {
    name: 'Pro',
    price: '999',
    description: 'For creators who want to push the boundaries.',
    features: [
      'Access to 500+ premium prompts',
      'Commercial usage license',
      'One-click prompt copy',
      'High-res example images',
      'Priority support',
      'Early access to new drops'
    ],
    cta: 'Upgrade to Pro',
    href: '/checkout',
    popular: true
  }
]

export default function PricingClient() {
  return (
    <main className="min-h-screen bg-aura-white pt-32 pb-40 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-aura-black"
          >
            Simple, <span className="text-aura-gray">Transparent</span> <br /> Pricing.
          </motion.h1>
          <p className="text-xl text-aura-gray max-w-2xl mx-auto">
            Choose the plan that fits your creative journey. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-12 rounded-[60px] border ${
                plan.popular 
                  ? 'bg-aura-black text-white border-aura-black' 
                  : 'bg-white text-aura-black border-aura-light-gray'
              } shadow-2xl space-y-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-aura-gray text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">{plan.name}</h3>
                <p className={plan.popular ? 'text-white/70' : 'text-aura-gray'}>
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">₹{plan.price}</span>
                <span className={plan.popular ? 'text-white/70 font-semibold' : 'text-aura-gray font-semibold'}>
                  {plan.price === '0' ? '' : '/ month'}
                </span>
              </div>

              <div className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-white/10 text-white' : 'bg-aura-light-gray text-aura-black'
                    }`}>
                      <Check size={14} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                fullWidth 
                size="lg" 
                variant={plan.popular ? 'primary' : 'secondary'}
                className={plan.popular ? 'bg-white text-aura-black hover:bg-white/90' : ''}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-aura-light-gray">
          {[
            { icon: <Zap size={24} />, title: 'Instant Access', desc: 'Get your prompts immediately after upgrade.' },
            { icon: <Shield size={24} />, title: 'Secure Payments', desc: 'Enterprise-grade encryption for all transactions.' },
            { icon: <Sparkles size={24} />, title: 'New Drops Daily', desc: 'Our library grows every single day.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-aura-light-gray flex items-center justify-center text-aura-black">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-aura-gray font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
