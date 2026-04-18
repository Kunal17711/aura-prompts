'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Lock, CreditCard, ChevronLeft, Check, Sparkles, Zap, ShieldAlert, Globe, Star, ArrowRight, Image as ImageIcon, MapPin, User as UserIcon, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Billing Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  // Load existing billing details if available
  useEffect(() => {
    if (user) {
      loadBillingDetails()
    }
  }, [user])

  async function loadBillingDetails() {
    const { data } = await supabase
      .from('billing_details')
      .select('*')
      .eq('user_id', user?.id)
      .single()
    
    if (data) {
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        pincode: data.pincode || ''
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading])

  const handlePayment = async () => {
    setError(null)
    
    // Basic validation
    if (!formData.full_name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill in all billing details before proceeding.')
      return
    }

    setProcessing(true)
    
    // Save Billing Details to Supabase
    const { error: dbError } = await supabase
      .from('billing_details')
      .upsert({
        user_id: user?.id,
        ...formData
      }, { onConflict: 'user_id' })

    if (dbError) {
      setError('Failed to save billing details. Please try again.')
      setProcessing(false)
      return
    }
    
    // In a real implementation, call Razorpay API here
    setTimeout(() => {
      alert('Billing details saved securely! Razorpay Modal would open now.')
      setProcessing(false)
    }, 1500)
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
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
    <main className="min-h-screen bg-[#fbfbfd] pt-24 pb-40 px-4 md:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aura-light-gray/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-aura-light-gray/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link href="/pricing" className="inline-flex items-center gap-3 text-aura-gray hover:text-aura-black transition-all font-bold group">
            <div className="w-10 h-10 rounded-full bg-white border border-aura-light-gray flex items-center justify-center group-hover:bg-aura-black group-hover:text-white transition-all shadow-sm">
              <ChevronLeft size={20} />
            </div>
            Back to Plans
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Summary Section (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-aura-light-gray rounded-full text-[10px] font-black uppercase tracking-widest text-aura-gray shadow-sm">
                <Star size={12} className="text-aura-black fill-aura-black" />
                Premium Upgrade
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-aura-black leading-none">
                Unlock the <br />
                <span className="text-aura-gray">Full Gallery.</span>
              </h1>
              <p className="text-xl text-aura-gray max-w-xl font-medium leading-relaxed">
                Join 1,000+ creators who use AURA Pro to design their reality with the world's most premium AI prompts.
              </p>
            </motion.div>

            {/* Billing Details Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="p-10 bg-white border border-aura-light-gray rounded-[48px] shadow-sm space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <MapPin className="text-aura-gray" />
                  Billing Information
                </h3>
                <p className="text-aura-gray font-medium text-sm">Required for secure checkout and invoicing.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
                  <ShieldAlert size={18} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-aura-gray ml-2">Full Name</label>
                  <Input name="full_name" value={formData.full_name} onChange={handleInputChange} placeholder="John Doe" icon={<UserIcon size={18} />} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-aura-gray ml-2">Phone Number</label>
                  <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" icon={<Phone size={18} />} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-aura-gray ml-2">Street Address</label>
                  <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Creative Street, Apt 4B" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-aura-gray ml-2">City</label>
                  <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="Mumbai" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-aura-gray ml-2">State</label>
                    <Input name="state" value={formData.state} onChange={handleInputChange} placeholder="MH" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-aura-gray ml-2">PIN Code</label>
                    <Input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="400001" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { icon: <Globe size={20} />, title: '5,000+ Prompts', desc: 'Unlimited access to the entire library.' },
                { icon: <Zap size={20} />, title: 'Pro Text', desc: 'Unblur and copy all hidden prompt logic.' },
                { icon: <ImageIcon size={20} />, title: 'High Res', desc: 'See every detail in ultra-high resolution.' },
                { icon: <ShieldCheck size={20} />, title: 'Usage Rights', desc: 'Full commercial rights for everything.' }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white border border-aura-light-gray rounded-[40px] space-y-4 hover:shadow-xl hover:shadow-black/[0.02] transition-all group">
                  <div className="w-12 h-12 bg-aura-light-gray/50 rounded-2xl flex items-center justify-center text-aura-black group-hover:bg-aura-black group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-aura-gray font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Checkout Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8 h-full">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="p-10 bg-white border border-aura-light-gray rounded-[56px] shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-10 sticky top-24"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">AURA Pro</h2>
                    <p className="text-aura-gray font-medium text-sm">Monthly Subscription</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold tracking-tighter text-aura-black">₹79</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-aura-gray">per month</div>
                  </div>
                </div>

                <div className="h-px bg-aura-light-gray w-full" />

                <div className="space-y-4">
                  <div className="flex justify-between text-aura-black font-semibold">
                    <span>AURA Pro Membership</span>
                    <span>₹79.00</span>
                  </div>
                  <div className="flex justify-between text-aura-gray font-medium text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-4 text-aura-black">
                    <span>Total</span>
                    <span>₹79.00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Button 
                  onClick={handlePayment}
                  disabled={processing}
                  fullWidth
                  className="h-16 text-xl bg-aura-black hover:bg-aura-black/90 shadow-2xl shadow-black/20"
                >
                  {processing ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Pay Securely <ArrowRight size={20} />
                    </span>
                  )}
                </Button>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 bg-aura-light-gray/50 rounded-full flex items-center justify-center text-aura-black">
                      <Lock size={16} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-aura-gray">Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 bg-aura-light-gray/50 rounded-full flex items-center justify-center text-aura-black">
                      <CreditCard size={16} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-aura-gray">Instant</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 bg-aura-light-gray/50 rounded-full flex items-center justify-center text-aura-black">
                      <Globe size={16} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-aura-gray">Global</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-aura-gray font-medium text-center leading-relaxed">
                Secured by Razorpay. All transactions are encrypted. <br />
                You can cancel your subscription at any time.
              </p>
            </motion.div>

            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 text-aura-gray opacity-40 hover:opacity-100 transition-opacity"
            >
              <div className="h-4 w-12 bg-aura-gray rounded-sm" />
              <div className="h-4 w-12 bg-aura-gray rounded-sm" />
              <div className="h-4 w-12 bg-aura-gray rounded-sm" />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
