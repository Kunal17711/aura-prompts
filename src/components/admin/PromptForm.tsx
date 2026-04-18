'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Image as ImageIcon, Upload, Loader2 } from 'lucide-react'

interface PromptFormProps {
  initialData?: any
  mode?: 'create' | 'edit'
}

export function PromptForm({ initialData, mode = 'create' }: PromptFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.example_image_url || null)
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Portrait',
    description: initialData?.description || '',
    prompt_text: initialData?.prompt_text || '',
    tags: initialData?.tags || '',
    is_free: initialData?.is_free !== undefined ? initialData.is_free : true,
    is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = imagePreview

      // 1. Upload image if new file selected
      if (imageFile) {
        const uploadForm = new FormData()
        uploadForm.append('file', imageFile)
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadForm,
        })
        const result = await res.json()
        if (!res.ok) throw new Error(result.error || 'Image upload failed')
        imageUrl = result.url
      }

      if (!imageUrl) throw new Error('Please upload an example image')

      const promptData = {
        ...formData,
        example_image_url: imageUrl,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      }

      const res = await fetch('/api/create-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          id: initialData?.id,
          ...promptData,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to save prompt')

      router.push('/aura-admin-kunal-2010-secret-v93-82739487239487239487234/prompts')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-4xl">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <label className="block text-sm font-bold uppercase tracking-widest text-aura-gray">
          Example Image
        </label>
        <div 
          className="relative aspect-[4/3] rounded-[32px] border-2 border-dashed border-aura-light-gray bg-aura-light-gray/20 flex flex-col items-center justify-center overflow-hidden hover:bg-aura-light-gray/30 transition-all cursor-pointer group"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="text-white" size={32} />
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                <ImageIcon className="text-aura-gray" size={24} />
              </div>
              <p className="text-aura-gray font-medium">Click to upload example image</p>
            </div>
          )}
        </div>
        <input 
          id="image-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="hidden" 
        />
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input 
          label="Prompt Name"
          placeholder="e.g. Ethereal Neon Portrait"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input 
          label="Slug (URL)"
          placeholder="ethereal-neon-portrait"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
        <div className="space-y-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-aura-gray">Category</label>
          <select 
            className="w-full px-4 py-3 bg-aura-light-gray/50 border border-transparent rounded-2xl focus:bg-white focus:border-aura-black/10 focus:ring-4 focus:ring-aura-black/5 outline-none transition-all duration-300"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {['Portrait', 'Fashion', 'Cinematic', 'Fantasy', 'Professional', 'Indian', 'Architecture', 'Nature'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <Input 
          label="Tags (Comma separated)"
          placeholder="neon, glowing, futuristic"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold uppercase tracking-widest text-aura-gray">Description</label>
        <textarea 
          className="w-full px-4 py-3 bg-aura-light-gray/50 border border-transparent rounded-3xl focus:bg-white focus:border-aura-black/10 focus:ring-4 focus:ring-aura-black/5 outline-none transition-all duration-300 min-h-[100px]"
          placeholder="Describe the aesthetic and purpose of this prompt..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold uppercase tracking-widest text-aura-gray">Full Prompt Text</label>
        <textarea 
          className="w-full px-4 py-3 bg-aura-light-gray/50 border border-transparent rounded-3xl focus:bg-white focus:border-aura-black/10 focus:ring-4 focus:ring-aura-black/5 outline-none transition-all duration-300 min-h-[150px] font-mono text-sm"
          placeholder="Paste the full AI prompt here..."
          value={formData.prompt_text}
          onChange={(e) => setFormData({ ...formData, prompt_text: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-wrap gap-8">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.is_free ? 'bg-aura-black border-aura-black' : 'border-aura-light-gray group-hover:border-aura-gray'}`}
            onClick={() => setFormData({ ...formData, is_free: !formData.is_free })}
          >
            {formData.is_free && <Check size={16} className="text-white" strokeWidth={4} />}
          </div>
          <span className="font-bold text-aura-black">Free Prompt</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.is_active ? 'bg-aura-black border-aura-black' : 'border-aura-light-gray group-hover:border-aura-gray'}`}
            onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
          >
            {formData.is_active && <Check size={16} className="text-white" strokeWidth={4} />}
          </div>
          <span className="font-bold text-aura-black">Active (Visible)</span>
        </label>
      </div>

      <div className="flex gap-4 pt-8">
        <Button type="submit" size="lg" className="h-14 px-12" isLoading={loading}>
          {mode === 'create' ? 'Publish Prompt' : 'Update Prompt'}
        </Button>
        <Button variant="secondary" size="lg" className="h-14" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function Check({ size, className, strokeWidth }: { size: number, className?: string, strokeWidth?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth || 2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
