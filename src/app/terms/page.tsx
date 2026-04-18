import React from 'react'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-aura-white pt-24 pb-40 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-aura-black">Terms of Service</h1>
          <p className="text-aura-gray font-medium">Last updated: April 18, 2026</p>
        </div>

        <div className="prose prose-aura max-w-none space-y-8 text-aura-black/80 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AURA, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on AURA's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">3. Intellectual Property</h2>
            <p>
              All prompts, images, and content on AURA are protected by intellectual property laws. Users may use the prompts according to their subscription level.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">4. Disclaimer</h2>
            <p>
              The materials on AURA's website are provided on an 'as is' basis. AURA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">5. Limitations</h2>
            <p>
              In no event shall AURA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AURA's website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-aura-black">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
