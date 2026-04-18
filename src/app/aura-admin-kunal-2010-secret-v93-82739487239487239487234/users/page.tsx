import { getSupabaseServerClient } from '@/lib/supabase'
import { AdminUsersClient } from '@/components/admin/AdminUsersClient'

export const revalidate = 0

export default async function AdminUsersPage() {
  const supabase = getSupabaseServerClient()
  
  const { data: users, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminUsersClient initialUsers={users || []} />
}
