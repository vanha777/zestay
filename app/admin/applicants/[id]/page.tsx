import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ApplicantDetailClient from './ApplicantDetailClient'

export default async function ApplicantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: application, error } = await supabase
    .from('applications')
    .select(`
      *,
      profiles:tenant_id (
        first_name,
        last_name,
        email,
        phone
      ),
      properties:property_id (
        id,
        address,
        city,
        state,
        zip_code
      ),
      rooms:room_id (
        id,
        name,
        rent_amount
      ),
      documents:documents (
        id,
        name,
        document_type,
        storage_path,
        created_at
      )
    `)
    .eq('id', id)
    .single()

  if (error || !application) {
    console.error('Error fetching application detail:', error)
    return notFound()
  }

  const personalInfo = (application.personal_info as any) || {}
  const profile = (application.profiles as any) || {}
  const property = (application.properties as any) || {}
  const room = (application.rooms as any) || {}
  const docs = (application.documents as any[]) || []

  // Combine profile and personal_info data
  const applicantData = {
    firstName: profile.first_name || personalInfo.firstName || 'N/A',
    lastName: profile.last_name || personalInfo.lastName || 'N/A',
    email: profile.email || personalInfo.email || 'N/A',
    phone: profile.phone || personalInfo.phone || 'N/A',
    dob: personalInfo.dob || 'N/A',
    occupation: personalInfo.occupation || 'N/A',
    emergencyContact: personalInfo.emergencyContactName || 'N/A',
    emergencyPhone: personalInfo.emergencyContactPhone || 'N/A',
    notes: application.notes || personalInfo.notes || 'No notes provided.'
  }

  // Pre-generate public URLs for documents
  const publicUrls: { [key: string]: string } = {}
  for (const doc of docs) {
    const { data } = supabase.storage.from('documents').getPublicUrl(doc.storage_path)
    publicUrls[doc.id] = data.publicUrl
  }

  return (
    <ApplicantDetailClient 
      id={id}
      applicantData={applicantData}
      application={application}
      property={property}
      room={room}
      docs={docs}
      publicUrls={publicUrls}
    />
  )
}
