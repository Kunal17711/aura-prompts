import { getSupabaseServerClient } from '@/lib/supabase'
import { HomeClient } from '@/components/home/HomeClient'

export const revalidate = 0 // Optional: Set to revalidate on every request during dev, or specify an interval.

export default async function HomePage() {
  const supabase = getSupabaseServerClient()
  
  const { data } = await supabase
    .from('prompts')
    .select('*')
    .eq('is_active', true)
    .limit(6)
    .order('created_at', { ascending: false })

  return <HomeClient initialPrompts={data || []} />
}
