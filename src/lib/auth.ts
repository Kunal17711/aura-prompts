import { supabase } from './supabase'

export const authUtils = {
  // Email OTP Sign In/Up (Magic Link or Code)
  async signInWithOTP(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) throw error
    return data
  },

  // Verify OTP Code
  async verifyOTP(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })

    if (error) throw error
    return data
  },

  // Traditional Sign Up (if needed)
  async signUpWithEmail(email: string, password: string, name: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (authError) throw authError
    return authData
  },

  // Traditional Sign In
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Google OAuth
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) throw error
    return data
  },

  // Sign Out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get Current Session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Get Current User
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },
}

// Get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Check if user is admin
export function isAdmin(userId: string | undefined) {
  if (!userId) return false
  const adminIds = process.env.NEXT_PUBLIC_ADMIN_USER_IDS || process.env.ADMIN_USER_IDS || ''
  return adminIds.split(',').map(id => id.trim()).includes(userId)
}

// Check if user is pro
export function isUserPro(profile: any) {
  if (!profile || profile.plan !== 'pro') return false
  if (!profile.subscription_end) return false

  const expiryDate = new Date(profile.subscription_end)
  return expiryDate > new Date()
}
