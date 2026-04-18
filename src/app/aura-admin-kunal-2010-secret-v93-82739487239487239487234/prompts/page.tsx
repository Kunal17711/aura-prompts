import { getSupabaseServerClient } from '@/lib/supabase'
import { Plus, Search, Edit2, Trash2, ExternalLink, Filter, MoreVertical, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { AdminPromptsClient } from '@/components/admin/AdminPromptsClient'

export const revalidate = 0

export default async function AdminPromptsPage() {
  const supabase = getSupabaseServerClient()
  
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminPromptsClient initialPrompts={prompts || []} />
}
