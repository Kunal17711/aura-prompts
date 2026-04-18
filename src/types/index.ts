export interface Profile {
  id: string
  name: string
  plan: 'free' | 'pro'
  subscription_end: string | null
  created_at: string
}

export interface Prompt {
  id: string
  name: string
  slug: string
  category: string
  description: string
  example_image_url: string
  prompt_text?: string
  tags: string[]
  is_free: boolean
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface SavedPrompt {
  id: string
  user_id: string
  prompt_id: string
  created_at: string
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
  }
}
