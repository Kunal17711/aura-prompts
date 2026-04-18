import { SignInForm } from '@/components/auth/SignInForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In - AURA',
  description: 'Sign in to your AURA account',
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  )
}
