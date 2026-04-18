'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ShieldAlert, ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const ADMIN_PASSWORD = 'Kunalpassword_2010'

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('aura_admin_auth')
    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true)
        sessionStorage.setItem('aura_admin_auth', 'true')
      } else {
        setError('Unauthorized Access Detected. Security Protocol Activated.')
      }
      setLoading(false)
    }, 800)
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-aura-black flex items-center justify-center p-4 selection:bg-white selection:text-aura-black">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 shadow-2xl space-y-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="text-center space-y-4 relative z-10">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-white to-zinc-400 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-white/10"
            >
              <ShieldCheck size={40} className="text-aura-black" />
            </motion.div>
            <h1 className="text-5xl font-bold tracking-tighter text-white leading-tight">
              AURA <span className="text-aura-gray">CORE</span>
            </h1>
            <p className="text-zinc-500 font-medium text-lg">
              Encryption Level: <span className="text-white">QUANTUM-7</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                  Secure Access Key
                </label>
                <span className="text-[10px] font-mono text-zinc-700">ST-0192-X</span>
              </div>
              <Input
                type="password"
                placeholder="Enter Secure Code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-aura-black border-zinc-800 text-white h-16 text-2xl tracking-[0.5em] font-mono placeholder:text-zinc-800 focus:ring-white/10 rounded-3xl"
                autoFocus
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 text-sm font-bold flex flex-col gap-1 items-center text-center"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldAlert size={18} />
                    <span className="uppercase tracking-widest text-xs">Security Violation</span>
                  </div>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              fullWidth 
              isLoading={loading}
              className="h-16 bg-white text-aura-black hover:bg-zinc-200 text-xl font-black rounded-3xl shadow-2xl shadow-white/5 active:scale-95 transition-all"
            >
              INITIALIZE SESSION
            </Button>
          </form>

          <div className="pt-6 grid grid-cols-2 gap-4 relative z-10 border-t border-zinc-800/50 mt-4">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Protocol</p>
              <p className="text-[10px] font-mono text-zinc-400">HTTPS/TLS 1.3</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Location</p>
              <p className="text-[10px] font-mono text-zinc-400">Global Nexus</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center space-y-2"
        >
          <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em]">
            Authorized Personnel Only
          </p>
          <div className="flex justify-center gap-4 text-zinc-800">
            <Zap size={12} />
            <Shield size={12} />
            <Lock size={12} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Shield({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

