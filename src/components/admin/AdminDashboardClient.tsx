'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Database, Users, TrendingUp, Zap, Lock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface AdminDashboardClientProps {
  stats: {
    prompts: number
    users: number
  }
}

export function AdminDashboardClient({ stats }: AdminDashboardClientProps) {
  const statCards = [
    { label: 'Total Prompts', value: stats.prompts.toString(), icon: <Database size={24} />, color: 'bg-aura-black', trend: 'Live from DB' },
    { label: 'Active Subs', value: '0', icon: <TrendingUp size={24} />, color: 'bg-aura-black', trend: 'Coming Soon' },
    { label: 'Total Users', value: stats.users.toString(), icon: <Users size={24} />, color: 'bg-aura-black', trend: 'Live from DB' },
    { label: 'Revenue', value: '₹0', icon: <Zap size={24} />, color: 'bg-aura-black', trend: 'Coming Soon' },
  ]

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-aura-black text-white text-[10px] font-black uppercase tracking-widest rounded-full"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            System Online: v9.3.4
          </motion.div>
          <h1 className="text-6xl font-bold tracking-tighter text-aura-black">Command Center</h1>
          <p className="text-aura-gray text-xl font-medium max-w-xl">
            Real-time infrastructure monitoring and content orchestration for AURA AI.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" size="lg" className="h-16 px-8 rounded-3xl font-bold">
            System Logs
          </Button>
          <Button size="lg" className="h-16 px-10 rounded-3xl font-black shadow-xl shadow-black/10">
            <Link href="/aura-admin-kunal-2010-secret-v93-82739487239487239487234/prompts/new" className="flex items-center gap-3">
              <Plus size={24} strokeWidth={3} />
              Deploy Prompt
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
            className="p-8 bg-white rounded-[40px] border border-aura-light-gray shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {stat.icon}
            </div>
            <div className="space-y-2">
              <p className="text-aura-gray font-black uppercase tracking-widest text-[10px]">{stat.label}</p>
              <h3 className="text-4xl font-bold text-aura-black tabular-nums tracking-tighter">{stat.value}</h3>
              <p className="text-blue-600 text-xs font-bold">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-12 bg-aura-black text-white rounded-[60px] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
          <h2 className="text-4xl font-bold tracking-tighter relative z-10">Neural Engine Status</h2>
          <div className="space-y-6 relative z-10">
            {[
              { label: 'Prompt Processing', value: 98 },
              { label: 'Image Generation Hook', value: 100 },
              { label: 'Auth Middleware', value: 100 },
              { label: 'Global CDN Latency', value: 94 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-white/60">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 bg-white rounded-[60px] border border-aura-light-gray space-y-8">
          <h3 className="text-2xl font-bold tracking-tighter">Security Protocol</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-aura-light-gray/30 rounded-3xl">
              <div className="w-10 h-10 bg-aura-black rounded-xl flex items-center justify-center text-white">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">AES-256 Active</p>
                <p className="text-xs text-aura-gray">Full disk encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-aura-light-gray/30 rounded-3xl">
              <div className="w-10 h-10 bg-aura-black rounded-xl flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">RLS Policies</p>
                <p className="text-xs text-aura-gray">Supabase hardened</p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-[10px] font-black text-aura-gray uppercase tracking-[0.2em] mb-4">Node Identity</p>
              <div className="p-4 bg-aura-light-gray/50 rounded-2xl font-mono text-[10px] break-all">
                SECURE_NODE_01_PROD
              </div>
            </div>
          </div>
        </div>
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
