import { supabase } from './supabase'

export const storageUtils = {
  async uploadPromptImage(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `prompts/${fileName}`

    const { data, error } = await supabase.storage
      .from('prompt-examples')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('prompt-examples')
      .getPublicUrl(filePath)

    return publicUrl
  }
}
