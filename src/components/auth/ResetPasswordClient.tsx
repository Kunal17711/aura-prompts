'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ResetPasswordClient() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
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
          <h1 className="text-4xl font-bold tracking-tight text-aura-black">Set new password</h1>
          <p className="text-aura-gray">Choose a strong password to secure your account.</p>
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
              <h3 className="text-xl font-bold text-aura-black">Password reset successful</h3>
              <p className="text-aura-gray leading-relaxed">
                Your password has been updated. Redirecting you to login...
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleReset} className="p-8 rounded-[40px] bg-white border border-aura-light-gray space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-aura-gray px-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray" size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-aura-light-gray focus:outline-none focus:ring-2 focus:ring-aura-black/5 transition-all text-aura-black"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-aura-gray px-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray" size={20} />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-aura-light-gray focus:outline-none focus:ring-2 focus:ring-aura-black/5 transition-all text-aura-black"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm font-medium text-red-500 px-1">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="h-14 rounded-2xl"
            >
              Update Password
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
