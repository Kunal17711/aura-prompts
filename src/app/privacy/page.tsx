import React from 'react'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-aura-white pt-24 pb-40 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-aura-black">Privacy Policy</h1>
          <p className="text-aura-gray font-medium">Last updated: April 18, 2026</p>
        </div>

        <div className="prose prose-aura max-w-none space-y-8 text-aura-black/80 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email address, and payment information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process your transactions, and send you technical notices and support messages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">3. Data Security</h2>
            <p>
              We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">4. Cookies</h2>
            <p>
              We use cookies to improve your experience on our website, understand how you use our services, and personalize content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at imperialmotivates@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
