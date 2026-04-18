'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit2, Trash2, ExternalLink, Filter, MoreVertical, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPrompts()
  }, [])

  async function fetchPrompts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPrompts(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prompt?')) return

    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id)

    if (!error) {
      setPrompts(prompts.filter(p => p.id !== id))
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('prompts')
      .update({ is_active: !currentStatus })
      .eq('id', id)

    if (!error) {
      setPrompts(prompts.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p))
    }
  }

  const filteredPrompts = prompts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-aura-black">Manage Prompts</h1>
          <p className="text-aura-gray text-lg">You have {prompts.length} prompts in your library.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray group-focus-within:text-aura-black transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Filter prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-aura-light-gray rounded-2xl focus:ring-4 focus:ring-aura-black/5 focus:border-aura-black/20 outline-none transition-all w-64"
            />
          </div>
          <Button size="lg" className="h-12 px-6">
            <Link href="/aura-admin-kunal-2010-secret-v93-82739487239487239487234/prompts/new" className="flex items-center gap-2 text-sm font-bold">
              <Plus size={18} />
              New Prompt
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-aura-light-gray overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-aura-light-gray bg-aura-light-gray/20">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Prompt</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Category</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Access</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Status</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aura-light-gray">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-10"><div className="h-4 bg-aura-light-gray rounded w-full" /></td>
                  </tr>
                ))
              ) : filteredPrompts.map((p) => (
                <tr key={p.id} className="hover:bg-aura-light-gray/10 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-aura-light-gray overflow-hidden flex-shrink-0">
                        <img src={p.example_image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-aura-black">{p.name}</p>
                        <p className="text-xs text-aura-gray font-medium truncate max-w-[200px]">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-aura-light-gray rounded-full text-[10px] font-black uppercase tracking-widest text-aura-gray">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {p.is_free ? (
                      <span className="text-sm font-bold text-green-600">Free</span>
                    ) : (
                      <span className="text-sm font-bold text-aura-black">PRO</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleActive(p.id, p.is_active)}
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${p.is_active ? 'text-blue-600' : 'text-aura-gray'}`}
                    >
                      {p.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                      {p.is_active ? 'Active' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/p/${p.slug}`} target="_blank">
                        <Button variant="secondary" className="w-10 h-10 p-0 rounded-xl">
                          <ExternalLink size={16} />
                        </Button>
                      </Link>
                      <Button variant="secondary" className="w-10 h-10 p-0 rounded-xl hover:text-red-500">
                        <Trash2 size={16} onClick={() => handleDelete(p.id)} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!loading && filteredPrompts.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <p className="text-aura-gray font-medium">No prompts found matching your filters.</p>
            <Button variant="secondary" onClick={() => setSearchQuery('')}>Clear search</Button>
          </div>
        )}
      </div>
    </div>
  )
}
