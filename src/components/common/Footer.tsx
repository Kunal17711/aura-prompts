import Link from 'next/link'
import { Mail, Camera, Send, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-24 px-6 bg-white border-t border-aura-light-gray">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 max-w-sm">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-aura-black">AURA</Link>
          <p className="text-aura-gray text-lg font-medium">The world's most premium AI prompt gallery. Design your reality, one prompt at a time.</p>
          
          {/* Horizontal Social Icons */}
          <div className="flex gap-6 pt-2">
            <a href="mailto:imperialmotivates@gmail.com" className="w-12 h-12 rounded-2xl bg-aura-light-gray flex items-center justify-center text-aura-black hover:bg-aura-black hover:text-white transition-all">
              <Mail size={20} />
            </a>
            <a href="https://instagram.com/iiblamekunal" target="_blank" className="w-12 h-12 rounded-2xl bg-aura-light-gray flex items-center justify-center text-aura-black hover:bg-aura-black hover:text-white transition-all">
              <Camera size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-aura-light-gray flex items-center justify-center text-aura-black hover:bg-aura-black hover:text-white transition-all">
              <Send size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-aura-gray">Product</h4>
            <ul className="space-y-2 font-semibold">
              <li><Link href="/gallery" className="hover:text-aura-gray transition-colors">Gallery</Link></li>
              <li><Link href="/pricing" className="hover:text-aura-gray transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-aura-gray transition-colors">Dashboard</Link></li>
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
      </div>
    </footer>
  )
}
