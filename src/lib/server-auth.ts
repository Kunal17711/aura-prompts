import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Verifies the user session from the request headers
 * Expects 'Authorization: Bearer <token>'
 */
export async function verifyUser(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    return null
  }

  return user
}

/**
 * Checks if the user is an admin
 */
export function isAdmin(userId: string) {
  const adminIds = process.env.ADMIN_USER_IDS || process.env.NEXT_PUBLIC_ADMIN_USER_IDS || ''
  return adminIds.split(',').map(id => id.trim()).includes(userId)
}
