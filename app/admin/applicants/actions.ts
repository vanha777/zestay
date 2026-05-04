'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateApplicationStatus(id: string, status: 'approved' | 'rejected') {
  const supabase = await createClient()

  if (status === 'approved') {
    // 1. Get application details
    const { data: application, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !application) {
      return { error: 'Application not found' }
    }

    const info = application.personal_info as any
    if (!info) {
      return { error: 'No personal information found in application' }
    }

    // 2. Resolve Profile (if they already signed up)
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', info.email)
      .single()

    let tenantId = existingProfile?.id

    if (tenantId) {
      // 3. Create/Update Tenant record (only if profile exists)
      const { error: tenantError } = await supabase
        .from('tenants')
        .upsert([{
          id: tenantId,
          date_of_birth: info.dob,
          occupation: info.occupation,
          emergency_contact_name: info.emergencyContactName,
          emergency_contact_phone: info.emergencyContactPhone
        }])

      if (tenantError) {
        console.error('Error creating tenant record:', tenantError)
        return { error: 'Failed to synchronize tenant data.' }
      }
    }

    // 4. Update application status
    // If tenantId exists, we link it now. 
    // If not, the application is just 'approved', and will be linked automatically when they sign up via DB trigger.
    const { error: updateError } = await supabase
      .from('applications')
      .update({ 
        status, 
        tenant_id: tenantId || null 
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error finalizing application:', updateError)
      return { error: updateError.message }
    }
  } else {
    // Simple update for rejection
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Error rejecting application:', error)
      return { error: error.message }
    }
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
