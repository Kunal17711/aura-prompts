'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authUtils } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react'

export function SignInForm() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!email || !password) {
      setError('Please fill in all required fields')
      return
    }
    
    if (isSignUp && !name) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    try {
      if (isSignUp) {
        await authUtils.signUpWithEmail(email, password, name)
        // Attempt to log in immediately in case Confirm Email is OFF
        try {
          await authUtils.signInWithEmail(email, password)
          router.push('/dashboard')
        } catch(e) {
          setError('Account created! Please check your email to verify if required.')
        }
      } else {
        await authUtils.signInWithEmail(email, password)
        router.push('/dashboard')
      }
    } catch (err: any) {
      if (err.message?.includes('rate limit')) {
        setError('Rate limit exceeded. Try Google Sign In or wait an hour.')
      } else {
        setError(err.message || 'Authentication failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await authUtils.signInWithGoogle()
    } catch (err: any) {
      setError(err.message || 'Google sign in failed')
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? 'signup' : 'signin'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-aura-black">
              {isSignUp ? 'Create an Account' : 'Sign in to AURA'}
            </h1>
            <p className="text-aura-gray">
              {isSignUp ? 'Enter your details to get started' : 'Welcome back to the gallery'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isSignUp && (
                <div className="flex justify-end px-1">
                  <Link 
                    href="/auth/forgot-password"
                    className="text-xs font-bold text-aura-gray hover:text-aura-black transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>
            
            {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}

            <Button type="submit" fullWidth isLoading={loading} className="h-12">
              {isSignUp ? 'Sign Up' : 'Sign In'}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-aura-gray">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
              }}
              className="text-aura-black font-bold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
