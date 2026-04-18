'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { isAdmin } from '@/lib/auth'
import { Menu, X, User, ShieldCheck, Mail, Camera } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Navigation() {
  const { user, profile, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isUserAdmin = isAdmin(user?.id)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Pricing', href: '/pricing' },
  ]

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled 
          ? "bg-white/90 backdrop-blur-apple border-aura-light-gray h-16 md:h-14" 
          : "bg-white/95 backdrop-blur-md md:bg-transparent h-16 md:h-20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-bold tracking-tight text-aura-black"
          >
            AURA
          </motion.div>
        </Link>

        {/* Desktop Menu - Center */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-sm font-medium text-aura-gray hover:text-aura-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth - Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-aura-gray hover:text-aura-black transition-colors">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-aura-gray hover:text-aura-black transition-colors"
              >
                Sign Out
              </button>
              <Link href="/account">
                <div className="w-8 h-8 rounded-full bg-aura-light-gray flex items-center justify-center hover:bg-aura-gray/20 transition-colors">
                  <User size={18} className="text-aura-black" />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-aura-gray hover:text-aura-black transition-colors"
              >
                Sign In
              </Link>
              <Button size="sm" variant="primary">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 z-50 text-aura-black"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col"
          >
            <div className="flex-1 pt-32 px-8 space-y-12">
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-5xl font-bold text-aura-black tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="h-px bg-aura-light-gray" />

              <div className="flex flex-col gap-6">
                {user ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-bold text-aura-gray hover:text-aura-black transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/account" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-bold text-aura-gray hover:text-aura-black transition-colors"
                    >
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setMobileMenuOpen(false)
                      }}
                      className="text-2xl font-bold text-red-500 text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link 
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-bold text-aura-gray"
                    >
                      Sign In
                    </Link>
                    <Button size="lg" fullWidth onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-8 pb-12 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-aura-light-gray flex items-center justify-center">
                  <Camera size={20} />
                </div>
                <div className="w-10 h-10 rounded-xl bg-aura-light-gray flex items-center justify-center">
                  <Mail size={20} />
                </div>
              </div>
              <p className="text-xs font-bold text-aura-gray uppercase tracking-widest">© 2026 AURA AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
