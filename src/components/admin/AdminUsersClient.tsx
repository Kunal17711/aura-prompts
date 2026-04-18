'use client'

import React, { useState } from 'react'
import { Search, User, Mail, Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface AdminUsersClientProps {
  initialUsers: any[]
}

export function AdminUsersClient({ initialUsers }: AdminUsersClientProps) {
  const [users, setUsers] = useState<any[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-aura-black">Manage Users</h1>
          <p className="text-aura-gray text-lg">You have {users.length} registered users.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray group-focus-within:text-aura-black transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Filter users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-aura-light-gray rounded-2xl focus:ring-4 focus:ring-aura-black/5 focus:border-aura-black/20 outline-none transition-all w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-aura-light-gray overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-aura-light-gray bg-aura-light-gray/20">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">User</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Email</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Joined</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-aura-gray">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aura-light-gray">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-aura-light-gray/10 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-aura-black flex items-center justify-center text-white">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-aura-black">{u.full_name || 'No Name'}</p>
                        <p className="text-[10px] text-aura-gray font-mono">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-aura-black font-medium">
                      <Mail size={14} className="text-aura-gray" />
                      {u.email || 'N/A'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-aura-gray font-medium">
                      <Calendar size={14} />
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <p className="text-aura-gray font-medium">No users found matching your filters.</p>
            <Button variant="secondary" onClick={() => setSearchQuery('')}>Clear search</Button>
          </div>
        )}
      </div>
    </div>
  )
}
