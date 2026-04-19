import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { verifyUser, isAdmin } from '@/lib/server-auth'

export async function POST(request: NextRequest) {
  try {
    // 1. Verify User
    const user = await verifyUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse and Validate Body
    const body = await request.json()
    const { mode, id, ...promptData } = body

    if (!mode || (mode === 'edit' && !id)) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseServerClient()

    // 3. Authorization for Edit
    if (mode === 'edit') {
      const { data: existingPrompt, error: fetchError } = await supabaseAdmin
        .from('prompts')
        .select('user_id')
        .eq('id', id)
        .single()

      if (fetchError || !existingPrompt) {
        return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
      }

      const userIsAdmin = isAdmin(user.id)
      if (existingPrompt.user_id !== user.id && !userIsAdmin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      const { error } = await supabaseAdmin
        .from('prompts')
        .update(promptData)
        .eq('id', id)
      
      if (error) throw error
    } else {
      // For create, ensure user_id is set to the current user
      const { error } = await supabaseAdmin.from('prompts').insert({
        ...promptData,
        user_id: user.id
      })
      
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('create-prompt route error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
