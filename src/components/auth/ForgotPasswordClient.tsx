'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-aura-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center space-y-2">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-aura-gray hover:text-aura-black transition-colors mb-4">
            <ArrowLeft size={16} /> Back to login
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-aura-black">Forgot password?</h1>
          <p className="text-aura-gray">No worries, we'll send you reset instructions.</p>
        </div>

        {success ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-[40px] bg-white border border-aura-light-gray text-center space-y-6 shadow-xl"
          >
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-aura-black">Check your email</h3>
              <p className="text-aura-gray leading-relaxed">
                We've sent a password reset link to <span className="text-aura-black font-semibold">{email}</span>
              </p>
            </div>
            <Button fullWidth variant="secondary" onClick={() => setSuccess(false)}>
              Didn't receive the email? Try again
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleResetRequest} className="p-8 rounded-[40px] bg-white border border-aura-light-gray space-y-6 shadow-xl">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-aura-gray px-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray" size={20} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-aura-light-gray focus:outline-none focus:ring-2 focus:ring-aura-black/5 transition-all text-aura-black"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500 px-1">{error}</p>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="h-14 rounded-2xl"
            >
              Reset Password
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
