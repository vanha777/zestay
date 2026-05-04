'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'

export default function RentalApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  
  const [step, setStep] = useState(1)
  const [property, setProperty] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    occupation: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    notes: ''
  })
  
  const [files, setFiles] = useState<{ [key: string]: File }>({})

  useEffect(() => {
    async function fetchData() {
      const { data: propData } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single()
        
      const { data: roomData } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', params.roomId)
        .single()
        
      setProperty(propData)
      setRoom(roomData)
      setLoading(false)
    }
    fetchData()
  }, [params.id, params.roomId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] })
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const { data: appData, error: appError } = await supabase
        .from('applications')
        .insert([{
          property_id: params.id,
          room_id: params.roomId,
          status: 'pending',
          personal_info: formData,
          notes: formData.notes
        }])
        .select()
        .single()

      if (appError) throw appError

      for (const [type, file] of Object.entries(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${appData.id}/${type}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, file)
          
        if (!uploadError) {
          await supabase.from('documents').insert([{
            application_id: appData.id,
            name: file.name,
            storage_path: fileName,
            document_type: type,
            mime_type: file.type
          }])
        }
      }

      setStep(3) // Success
    } catch (err) {
      console.error('Submission error:', err)
      alert('Failed to submit application.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface font-body py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-2">
            Apply for {room?.name}
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base">
            {property?.address}, {property?.city}
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-6 md:p-10 shadow-sm">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="Jane" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="jane@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="+61 400 000 000" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">DOB</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Occupation</label>
                    <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="Engineer" />
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-sm mt-4 hover:opacity-90 transition-opacity">
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-3">ID Verification</p>
                    <input type="file" onChange={(e) => handleFileChange(e, 'id_proof')} className="text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/5 file:text-primary" />
                    {files['id_proof'] && <p className="text-[10px] text-primary mt-2 flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">check</span> {files['id_proof'].name}</p>}
                  </div>

                  <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-3">Income Proof</p>
                    <input type="file" onChange={(e) => handleFileChange(e, 'income_proof')} className="text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/5 file:text-primary" />
                    {files['income_proof'] && <p className="text-[10px] text-primary mt-2 flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">check</span> {files['income_proof'].name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Additional Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="Anything else we should know?" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-outline-variant/20 py-4 rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">
                    Back
                  </button>
                  <button onClick={handleSubmit} disabled={submitting} className="flex-[2] bg-primary text-on-primary py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h2 className="text-2xl font-headline font-bold">Application Sent</h2>
                <p className="text-on-surface-variant text-sm px-4">
                  We've received your application for {room?.name}. We'll be in touch soon.
                </p>
                <button onClick={() => router.push('/tenant')} className="text-primary font-bold text-sm mt-4 hover:underline underline-offset-4">
                  Back to Explore
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
