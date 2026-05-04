'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateApplicationStatus(id: string, status: 'approved' | 'rejected') {
  const supabase = await createClient()

  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating application status:', error)
    return { error: error.message }
  }

  revalidatePath(`/admin/applicants/${id}`)
  revalidatePath('/admin/applicants')
  return { success: true }
}

export async function updateApplicationNotes(id: string, notes: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('applications')
    .update({ notes })
    .eq('id', id)

  if (error) {
    console.error('Error updating application notes:', error)
    return { error: error.message }
  }

  revalidatePath(`/admin/applicants/${id}`)
  return { success: true }
}
