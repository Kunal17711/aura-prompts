import { getSupabaseServerClient } from '@/lib/supabase'
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient'

export const revalidate = 0

export default async function AdminDashboard() {
  const supabase = getSupabaseServerClient()
  
  // Fetch real counts
  const [
    { count: promptsCount },
    { count: usersCount }
  ] = await Promise.all([
    supabase.from('prompts').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true })
  ])

  return (
    <AdminDashboardClient 
      stats={{
        prompts: promptsCount || 0,
        users: usersCount || 0
      }} 
    />
  )
}

