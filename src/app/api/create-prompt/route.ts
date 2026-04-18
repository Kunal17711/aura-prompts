import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mode, id, ...promptData } = body

    let error

    if (mode === 'edit') {
      ;({ error } = await supabaseAdmin
        .from('prompts')
        .update(promptData)
        .eq('id', id))
    } else {
      ;({ error } = await supabaseAdmin.from('prompts').insert(promptData))
    }

    if (error) {
      console.error('Prompt insert/update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('create-prompt route error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
