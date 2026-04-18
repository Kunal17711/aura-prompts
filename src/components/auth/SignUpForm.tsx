'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authUtils } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface SignUpFormProps {
  onSuccess?: () => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address'
    if (!password) newErrors.password = 'Password is required'
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!agreed) newErrors.agreed = 'You must agree to the Terms and Conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      await authUtils.signUpWithEmail(email, password, name)
      onSuccess?.()
      router.push('/dashboard')
    } catch (error: any) {
      setErrors({ submit: error.message || 'Sign up failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {errors.submit}
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      <div className="flex items-start gap-3 px-1">
        <input
          id="terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-aura-light-gray text-aura-black focus:ring-aura-black cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-aura-gray leading-tight cursor-pointer">
          I agree to the <a href="/terms" className="text-aura-black font-semibold hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-aura-black font-semibold hover:underline">Privacy Policy</a>
        </label>
      </div>
      {errors.agreed && <p className="text-xs text-red-500 font-medium px-1">{errors.agreed}</p>}

      <Button type="submit" fullWidth isLoading={loading} className="h-12 mt-2">
        Create Account
      </Button>

      <p className="text-center text-sm text-aura-gray mt-6">
        Already have an account?{' '}
        <a href="/auth/login" className="text-aura-black font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </form>
  )
}
