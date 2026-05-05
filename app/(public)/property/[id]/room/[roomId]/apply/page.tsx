'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'

import { sendApplicationNotification } from '@/app/actions/notifications'

export default function RentalApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  
  const [step, setStep] = useState(1)
  const [property, setProperty] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [propertyImage, setPropertyImage] = useState<string>('')
  const [roomImage, setRoomImage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    nationality: 'aussie',
    visa: '',
    occupation: '',
    employmentStatus: 'full-time',
    incomeSource: 'salary',
    financialChanges: 'no',
    financialChangesDetails: '',
    employerName: '',
    employerPhone: '',
    employerEmail: '',
    universityName: '',
    fieldOfStudy: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    moveInDate: '',
    lengthOfStay: '12',
    smoking: 'no',
    pets: 'no',
    rentalExperience: 'no',
    rentalReferenceName: '',
    rentalReferencePhone: '',
    notes: ''
  })
  
  const [files, setFiles] = useState<{ [key: string]: File }>({})

  const getImageUrl = (path: string) => {
    if (!path) return ''
    const { data } = supabase.storage.from('documents').getPublicUrl(path)
    return data.publicUrl
  }

  useEffect(() => {
    async function fetchData() {
      const { data: propData } = await supabase
        .from('properties')
        .select('*, documents(storage_path)')
        .eq('id', params.id)
        .single()
        
      const { data: roomData } = await supabase
        .from('rooms')
        .select('*, documents(storage_path)')
        .eq('id', params.roomId)
        .single()
        
      setProperty(propData)
      setRoom(roomData)

      // Resolve images
      if (propData?.documents?.[0]?.storage_path) {
        setPropertyImage(getImageUrl(propData.documents[0].storage_path))
      } else {
        setPropertyImage('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')
      }

      if (roomData?.documents?.[0]?.storage_path) {
        setRoomImage(getImageUrl(roomData.documents[0].storage_path))
      } else {
        // Fallback to property image if room image doesn't exist
        setRoomImage(propData?.documents?.[0]?.storage_path ? getImageUrl(propData.documents[0].storage_path) : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')
      }

      setLoading(false)
    }
    fetchData()
  }, [params.id, params.roomId])

  const validatePhone = (phone: string) => {
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '')
    const auPhoneRegex = /^(?:\+61|0)4(?:[0-9]){8}$/
    return auPhoneRegex.test(phoneClean)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] })
      if (errors[type]) {
        setErrors({ ...errors, [type]: '' })
      }
    }
  }

  const nextStep = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!formData.address.trim()) newErrors.address = 'Current address is required'
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid AU mobile number'
      }
      if (formData.nationality === 'other' && !formData.visa.trim()) {
        newErrors.visa = 'Visa information is required'
      }
    }

    if (step === 2) {
      if (!formData.moveInDate) newErrors.moveInDate = 'Move-in date is required'
    }

    if (step === 3) {
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required'
      if (!formData.emergencyContactPhone.trim()) {
        newErrors.emergencyContactPhone = 'Emergency contact phone is required'
      } else if (!validatePhone(formData.emergencyContactPhone)) {
        newErrors.emergencyContactPhone = 'Enter a valid AU mobile number'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {}
    if (!files['id_proof']) newErrors.id_proof = 'ID verification is required'
    if (!files['income_proof']) newErrors.income_proof = 'Proof of income is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

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

      // Send Email Notification
      await sendApplicationNotification({
        applicantName: `${formData.firstName} ${formData.lastName}`,
        applicantEmail: formData.email,
        applicantAddress: formData.address,
        employerName: formData.employmentStatus === 'study' ? formData.universityName : formData.employerName,
        employerPhone: formData.employmentStatus === 'study' ? formData.fieldOfStudy : formData.employerPhone,
        employerEmail: formData.employmentStatus === 'study' ? '' : formData.employerEmail,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        propertyName: property?.address || 'Unknown Property',
        roomName: room?.name || 'Unknown Room',
        applicationId: appData.id,
        moveInDate: formData.moveInDate,
        lengthOfStay: formData.lengthOfStay,
        employmentStatus: formData.employmentStatus,
        occupation: formData.occupation,
        financialChanges: formData.financialChanges,
        financialChangesDetails: formData.financialChangesDetails,
        hasPets: formData.pets,
        isSmoker: formData.smoking,
        incomeSource: formData.incomeSource
      })

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

      setStep(5)
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
    <div className="min-h-screen bg-surface font-body pb-12 md:pb-24">
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden mb-12">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-full w-full">
            <img src={propertyImage} alt="Property" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative h-full w-full hidden md:block">
            <img src={roomImage} alt="Room" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="max-w-xl mx-auto flex items-end justify-between">
            <div className="text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-80">Application Portal</p>
              <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-1">
                {room?.name}
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium">
                {property?.address}, {property?.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary' : 'bg-outline-variant/20'}`} />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Step {step} of 4</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] p-6 md:p-10 shadow-sm">
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
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20 ${errors.firstName ? 'ring-1 ring-red-500/50' : ''}`} placeholder="Jane" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20 ${errors.lastName ? 'ring-1 ring-red-500/50' : ''}`} placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none" placeholder="0400 000 000" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Current Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none" placeholder="123 Example St, Melbourne" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none appearance-none">
                      <option value="">Select...</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Nationality</label>
                    <select name="nationality" value={formData.nationality} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none appearance-none">
                      <option value="aussie">Australian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {formData.nationality === 'other' && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Visa Type *</label>
                      <input type="text" name="visa" value={formData.visa} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none" placeholder="Student / Work" />
                    </motion.div>
                  )}
                </div>

                <button onClick={nextStep} className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-sm mt-4 hover:opacity-90 transition-opacity">
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
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Preferred Move-in Date *</label>
                    <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Length of Stay</label>
                    <select name="lengthOfStay" value={formData.lengthOfStay} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none appearance-none">
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3 p-4 bg-surface-container-low rounded-2xl">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline">Do you smoke?</label>
                    <div className="flex gap-4">
                      {['yes', 'no'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="smoking" value={opt} checked={formData.smoking === opt} onChange={handleInputChange} className="accent-primary" />
                          <span className="text-sm capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 p-4 bg-surface-container-low rounded-2xl">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline">Do you have pets?</label>
                    <div className="flex gap-4">
                      {['yes', 'no'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="pets" value={opt} checked={formData.pets === opt} onChange={handleInputChange} className="accent-primary" />
                          <span className="text-sm capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-outline">Previous Rental Experience</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent has-[:checked]:border-primary/20 has-[:checked]:bg-primary/5">
                      <input type="radio" name="rentalExperience" value="yes" checked={formData.rentalExperience === 'yes'} onChange={handleInputChange} className="accent-primary" />
                      <span className="text-sm font-medium text-on-surface">I have rented before</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent has-[:checked]:border-primary/20 has-[:checked]:bg-primary/5">
                      <input type="radio" name="rentalExperience" value="no" checked={formData.rentalExperience === 'no'} onChange={handleInputChange} className="accent-primary" />
                      <span className="text-sm font-medium text-on-surface">I haven't rented before</span>
                    </label>
                  </div>
                </div>

                {formData.rentalExperience === 'yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 bg-primary/5 rounded-2xl space-y-4">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-primary">Rental Reference</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1">Reference Name</label>
                        <input type="text" name="rentalReferenceName" value={formData.rentalReferenceName} onChange={handleInputChange} className="w-full bg-surface-container-lowest rounded-xl p-3.5 text-sm outline-none" placeholder="Agent or Landlord" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1">Contact Phone</label>
                        <input type="tel" name="rentalReferencePhone" value={formData.rentalReferencePhone} onChange={handleInputChange} className="w-full bg-surface-container-lowest rounded-xl p-3.5 text-sm outline-none" placeholder="0400 000 000" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 mt-4">
                  <button onClick={prevStep} className="flex-1 border border-outline-variant/20 py-4 rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">
                    Back
                  </button>
                  <button onClick={nextStep} className="flex-[2] bg-primary text-on-primary py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Employment Status</label>
                  <select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none appearance-none">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="casual">Casual</option>
                    <option value="study">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <AnimatePresence mode="wait">
                  {formData.employmentStatus === 'study' ? (
                    <motion.div
                      key="study-ref"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10"
                    >
                      <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-6">Education Details</p>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">University / Institution Name</label>
                          <input type="text" name="universityName" value={formData.universityName} onChange={handleInputChange} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none" placeholder="University of Melbourne" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Course / Field of Study</label>
                          <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none" placeholder="Bachelor of Science" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="work-ref"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10"
                    >
                      <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-6">Employment Reference</p>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Occupation or Job title</label>
                          <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none" placeholder="Software Engineer" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Company / Manager Name</label>
                          <input type="text" name="employerName" value={formData.employerName} onChange={handleInputChange} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none" placeholder="Acme Corp" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Contact Phone</label>
                            <input type="tel" name="employerPhone" value={formData.employerPhone} onChange={handleInputChange} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none" placeholder="0400 000 000" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Contact Email</label>
                            <input type="email" name="employerEmail" value={formData.employerEmail} onChange={handleInputChange} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none" placeholder="manager@company.com" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`p-6 bg-surface-container-low rounded-[2rem] border transition-all ${errors.emergencyContactName || errors.emergencyContactPhone ? 'border-red-500/50' : 'border-outline-variant/10'}`}>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-6">Emergency Contact *</p>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Contact Name *</label>
                      <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} className={`w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none ${errors.emergencyContactName ? 'ring-1 ring-red-500/50' : ''}`} placeholder="Family member or friend" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Contact Phone *</label>
                      <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleInputChange} className={`w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none ${errors.emergencyContactPhone ? 'ring-1 ring-red-500/50' : ''}`} placeholder="0400 000 000" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={prevStep} className="flex-1 border border-outline-variant/20 py-4 rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">
                    Back
                  </button>
                  <button onClick={nextStep} className="flex-[2] bg-primary text-on-primary py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`p-6 bg-surface-container-low rounded-2xl border transition-all ${errors.id_proof ? 'border-red-500/50' : 'border-outline-variant/10'}`}>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-1">ID Verification *</p>
                  <p className="text-[10px] text-outline-variant mb-4 font-medium italic">Driver's License or Passport</p>
                  <input type="file" onChange={(e) => handleFileChange(e, 'id_proof')} className="text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/5 file:text-primary" />
                  {files['id_proof'] && <p className="text-[10px] text-primary mt-2 flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">check</span> {files['id_proof'].name}</p>}
                </div>

                <div className={`p-6 bg-surface-container-low rounded-2xl border transition-all ${errors.income_proof ? 'border-red-500/50' : 'border-outline-variant/10'}`}>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-4">Proof of Rent Payment *</p>
                  
                  <div className="space-y-3 mb-6">
                    <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1 opacity-60">Source of income / Support</label>
                    <select name="incomeSource" value={formData.incomeSource} onChange={handleInputChange} className="w-full bg-surface-container-lowest rounded-xl p-3.5 text-sm outline-none appearance-none border border-outline-variant/10">
                      <option value="salary">Salary / Wages</option>
                      <option value="parental">Parental / Family Support</option>
                      <option value="savings">Savings</option>
                      <option value="government">Government Allowance / Pension</option>
                    </select>
                  </div>

                  <p className="text-[10px] text-outline-variant mb-4 font-medium italic">Please upload Payslips, Bank Statement, or Support Letter</p>
                  <input type="file" onChange={(e) => handleFileChange(e, 'income_proof')} className="text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/5 file:text-primary" />
                  {files['income_proof'] && <p className="text-[10px] text-primary mt-2 flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">check</span> {files['income_proof'].name}</p>}
                </div>

                <div className="p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-primary">Financial Stability Declaration *</label>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Do you foresee any changes in your financial situation over the next 6–12 months that would impact your ability to pay rent on time?
                      <br />
                      <span className="text-[10px] opacity-60 italic">e.g., job contract ending, change in study load, loss of income?</span>
                    </p>
                    <div className="flex gap-6 mt-2">
                      {['no', 'yes'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="financialChanges" value={opt} checked={formData.financialChanges === opt} onChange={handleInputChange} className="accent-primary" />
                          <span className="text-sm capitalize font-medium group-hover:text-primary transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.financialChanges === 'yes' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="space-y-1.5 pt-2">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-outline ml-1">Please provide details *</label>
                          <textarea name="financialChangesDetails" value={formData.financialChangesDetails} onChange={handleInputChange} rows={2} className="w-full bg-surface-container-high rounded-xl p-3.5 text-sm outline-none border border-outline-variant/10" placeholder="Describe any expected changes..." />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-surface-container-low rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-primary/20" placeholder="Anything else we should know?" />
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={prevStep} className="flex-1 border border-outline-variant/20 py-4 rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">
                    Back
                  </button>
                  <button onClick={handleSubmit} disabled={submitting} className="flex-[2] bg-primary text-on-primary py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
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
