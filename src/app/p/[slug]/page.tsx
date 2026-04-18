import { getSupabaseServerClient } from '@/lib/supabase'
import { PromptDetailClient } from '@/components/prompt/PromptDetailClient'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function PromptDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const supabase = getSupabaseServerClient()
  
  // 1. Fetch the main prompt
  const { data: prompt, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !prompt) {
    return notFound()
  }

  // 2. Fetch similar prompts
  const { data: similarPrompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('category', prompt.category)
    .neq('id', prompt.id)
    .limit(3)

  return <PromptDetailClient prompt={prompt} similarPrompts={similarPrompts || []} />
}
