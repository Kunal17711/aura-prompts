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

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 2. Validate File Type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseServerClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `prompts/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await supabaseAdmin.storage
      .from('prompt-examples')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Storage upload error:', error)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('prompt-examples')
      .getPublicUrl(filePath)

    return NextResponse.json({ url: publicUrl })
  } catch (err: any) {
    console.error('Upload route error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
