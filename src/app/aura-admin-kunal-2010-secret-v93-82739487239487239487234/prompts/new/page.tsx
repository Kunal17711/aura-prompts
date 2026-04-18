'use client'

import { PromptForm } from '@/components/admin/PromptForm'
import { ChevronLeft } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewPromptPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Link 
          href="/aura-admin-kunal-2010-secret-v93-82739487239487239487234/prompts" 
          className="flex items-center gap-2 text-aura-gray hover:text-aura-black transition-colors font-bold text-sm mb-6"
        >
          <ArrowLeft size={16} />
          Back to Prompts
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-aura-black">Create New Prompt</h1>
        <p className="text-aura-gray text-lg max-w-2xl">
          Upload your AI masterpiece and its prompt. Make sure the prompt is clear and produces the expected result.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-aura-light-gray shadow-sm">
        <PromptForm mode="create" />
      </div>
    </div>
  )
}
