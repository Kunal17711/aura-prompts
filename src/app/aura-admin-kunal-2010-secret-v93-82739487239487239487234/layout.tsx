'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { LayoutDashboard, Image as ImageIcon, Users, LogOut } from 'lucide-react'

import { AdminAuthWrapper } from '@/components/admin/AdminAuthWrapper'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aura-white">
        <div className="w-8 h-8 border-4 border-aura-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/aura-admin-kunal-2010-secret-v93-82739487239487239487234' },
    { icon: <ImageIcon size={20} />, label: 'Prompts', href: '/aura-admin-kunal-2010-secret-v93-82739487239487239487234/prompts' },
    { icon: <Users size={20} />, label: 'Users', href: '/aura-admin-kunal-2010-secret-v93-82739487239487239487234/users' },
  ]

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-aura-light-gray/20 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-aura-light-gray flex flex-col fixed inset-y-0">
          <div className="p-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-aura-black">
              AURA <span className="text-[10px] bg-aura-black text-white px-2 py-0.5 rounded-full align-middle ml-1">ADMIN</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-aura-gray hover:text-aura-black hover:bg-aura-light-gray rounded-2xl transition-all font-semibold"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-aura-light-gray">
            <button 
              onClick={() => signOut()}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-semibold"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 md:p-12 lg:p-16">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthWrapper>
  )
}
