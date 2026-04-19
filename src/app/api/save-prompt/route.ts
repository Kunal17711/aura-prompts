import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { verifyUser } from '@/lib/server-auth'

export async function POST(request: NextRequest) {
  try {
    // 1. Verify User
    const user = await verifyUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse and Validate Body
    const { promptId, action } = await request.json()

    if (!promptId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (action !== 'save' && action !== 'unsave') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseServerClient()

    // 3. Perform Action
    if (action === 'save') {
      const { error } = await supabaseAdmin
        .from('saved_prompts')
        .insert({ user_id: user.id, prompt_id: promptId })
      
      if (error && error.code !== '23505') { // Ignore duplicate key error
        throw error
      }
    } else if (action === 'unsave') {
      const { error } = await supabaseAdmin
        .from('saved_prompts')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId)
      
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('save-prompt route error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
