'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-24 px-6 bg-white border-t border-aura-light-gray">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 max-w-sm">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-aura-black">AURA</Link>
          <p className="text-aura-gray text-lg font-medium">The world's most premium AI prompt gallery. Design your reality, one prompt at a time.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-aura-gray">Product</h4>
            <ul className="space-y-2 font-semibold">
              <li><Link href="/gallery" className="hover:text-aura-gray transition-colors">Gallery</Link></li>
              <li><Link href="/pricing" className="hover:text-aura-gray transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-aura-gray transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-aura-gray">Contact</h4>
            <ul className="space-y-2 font-semibold">
              <li><a href="mailto:imperialmotivates@gmail.com" className="hover:text-aura-gray transition-colors">Email</a></li>
              <li><a href="https://instagram.com/iiblamekunal" target="_blank" className="hover:text-aura-gray transition-colors">Instagram</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-aura-gray">Legal</h4>
            <ul className="space-y-2 font-semibold">
              <li><Link href="/privacy" className="hover:text-aura-gray transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-aura-gray transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-aura-light-gray flex flex-col sm:flex-row justify-between items-center gap-6 text-aura-gray font-semibold">
        <p>© 2026 AURA. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-aura-black transition-colors">Twitter</a>
          <a href="#" className="hover:text-aura-black transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
