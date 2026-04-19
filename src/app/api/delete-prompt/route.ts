import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { verifyUser, isAdmin } from '@/lib/server-auth'

export async function DELETE(request: NextRequest) {
  try {
    // 1. Verify User
    const user = await verifyUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()

    // 2. Check Permissions (Must be owner or admin)
    const { data: prompt, error: fetchError } = await supabase
      .from('prompts')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
    }

    const userIsAdmin = isAdmin(user.id)
    if (prompt.user_id !== user.id && !userIsAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // 3. Perform Deletion
    // Delete from saved_prompts first (if not using CASCADE)
    await supabase
      .from('saved_prompts')
      .delete()
      .eq('prompt_id', id)

    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('delete-prompt error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
