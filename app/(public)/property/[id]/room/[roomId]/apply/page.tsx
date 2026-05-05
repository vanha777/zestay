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
    incomeSource: ['salary'] as string[],
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
    rentalReasonToLeave: '',
    rentalStayDuration: '',
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

      if (propData?.documents?.[0]?.storage_path) {
        setPropertyImage(getImageUrl(propData.documents[0].storage_path))
      } else {
        setPropertyImage('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')
      }

      if (roomData?.documents?.[0]?.storage_path) {
        setRoomImage(getImageUrl(roomData.documents[0].storage_path))
      } else {
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

  const handleMultiSelectChange = (name: string, value: string) => {
    const currentValues = Array.isArray((formData as any)[name])
      ? (formData as any)[name] as string[]
      : typeof (formData as any)[name] === 'string'
        ? [(formData as any)[name]]
        : []

    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]

    setFormData({ ...formData, [name]: newValues })
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
      if (!formData.firstName.trim()) newErrors.firstName = 'Required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Required'
      if (!formData.email.trim()) newErrors.email = 'Required'
      if (!formData.address.trim()) newErrors.address = 'Required'
      if (!formData.phone.trim()) {
        newErrors.phone = 'Required'
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Invalid AU mobile'
      }
    }

    if (step === 2) {
      if (!formData.moveInDate) newErrors.moveInDate = 'Required'
      if (formData.rentalExperience === 'yes' && !formData.rentalStayDuration.trim()) {
        newErrors.rentalStayDuration = 'Required'
      }
    }

    if (step === 3) {
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Required'
      if (!formData.emergencyContactPhone.trim()) {
        newErrors.emergencyContactPhone = 'Required'
      } else if (!validatePhone(formData.emergencyContactPhone)) {
        newErrors.emergencyContactPhone = 'Invalid'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {}
    if (!files['id_proof']) {
      newErrors.id_proof = 'Required'
    }

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

      await sendApplicationNotification({
        applicantName: `${formData.firstName} ${formData.lastName}`,
        applicantEmail: formData.email,
        applicantAddress: formData.address,
        employerName: formData.employmentStatus === 'study' ? formData.universityName : formData.employerName,
        employerPhone: formData.employmentStatus === 'study' ? formData.fieldOfStudy : formData.employerPhone,
        employerEmail: formData.employmentStatus === 'study' ? '' : formData.employerEmail,
        occupation: formData.occupation,
        financialChanges: formData.financialChanges,
        financialChangesDetails: formData.financialChangesDetails,
        rentalReasonToLeave: formData.rentalReasonToLeave,
        rentalStayDuration: formData.rentalStayDuration,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        propertyName: property?.address || 'Unknown Property',
        roomName: room?.name || 'Unknown Room',
        applicationId: appData.id,
        moveInDate: formData.moveInDate,
        lengthOfStay: formData.lengthOfStay,
        employmentStatus: formData.employmentStatus,
        hasPets: formData.pets,
        isSmoker: formData.smoking,
        incomeSource: formData.incomeSource,
        visa: formData.visa,
        universityName: formData.universityName,
        fieldOfStudy: formData.fieldOfStudy
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
      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const steps = [
    { id: 1, title: 'Personal', icon: 'person' },
    { id: 2, title: 'Tenancy', icon: 'home' },
    { id: 3, title: 'Background', icon: 'badge' },
    { id: 4, title: 'Review', icon: 'verified' }
  ]

  return (
    <div className="min-h-screen bg-background font-plus-jakarta-sans text-on-background antialiased pb-24 overflow-x-hidden">
      {/* Dynamic Header */}
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="relative flex-1 h-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src={propertyImage}
              alt="Property"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
          </div>
          <div className="relative flex-1 h-full overflow-hidden hidden md:block border-l border-white/10">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              src={roomImage}
              alt="Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary/40 via-primary/10 to-transparent" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-20 bg-gradient-to-t from-primary/60 to-transparent">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                Application Portal
              </div>
              <h1 className="text-4xl md:text-7xl font-space-grotesk font-bold text-white tracking-tight leading-tight">
                {room?.name}
              </h1>
              <div className="flex items-center gap-4 text-white/80 font-medium text-sm md:text-lg">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">location_on</span> {property?.address}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        {/* Modern Stepper */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-2xl rounded-3xl p-4 md:p-8 border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] mb-8">
          <div className="flex items-center justify-between gap-4">
            {steps.map((s) => (
              <div key={s.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${step >= s.id ? 'bg-primary text-on-primary shadow-lg shadow-primary/10' : 'bg-surface-container-high text-outline'}`}>
                  <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest hidden md:block ${step >= s.id ? 'text-primary' : 'text-outline'}`}>{s.title}</span>
                {s.id < 4 && (
                  <div className="absolute top-5 -right-1/2 w-full h-[1px] bg-outline-variant/30 hidden md:block -z-10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: step > s.id ? '100%' : '0%' }}
                      className="h-full bg-primary"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-1">
                  <h2 className="text-3xl font-space-grotesk font-bold text-primary">Tell us about yourself</h2>
                  <p className="text-outline text-sm">Please provide your basic contact and identity details.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* Custom Styled Input */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all placeholder:text-outline-variant/50 ${errors.firstName ? 'border-red-500/50' : 'border-outline-variant focus:border-primary'}`} placeholder="Jane" />
                    {errors.firstName && <span className="text-[10px] text-red-500 font-bold uppercase tracking-tight">{errors.firstName}</span>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all placeholder:text-outline-variant/50 ${errors.lastName ? 'border-red-500/50' : 'border-outline-variant focus:border-primary'}`} placeholder="Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all placeholder:text-outline-variant/50 ${errors.email ? 'border-red-500/50' : 'border-outline-variant focus:border-primary'}`} placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all placeholder:text-outline-variant/50 ${errors.phone ? 'border-red-500/50' : 'border-outline-variant focus:border-primary'}`} placeholder="0400 000 000" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Current Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all placeholder:text-outline-variant/50 ${errors.address ? 'border-red-500/50' : 'border-outline-variant focus:border-primary'}`} placeholder="123 Example St, Melbourne" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant focus:border-primary" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Nationality</label>
                    <div className="flex gap-4 mt-2">
                      {['aussie', 'other'].map((opt) => (
                        <label key={opt} className={`flex-1 text-center py-3 rounded-2xl border-2 cursor-pointer transition-all font-bold text-xs uppercase tracking-widest ${formData.nationality === opt ? 'bg-primary border-primary text-on-primary shadow-xl shadow-primary/10' : 'bg-surface-container-lowest border-outline-variant/30 text-outline hover:border-secondary'}`}>
                          <input type="radio" name="nationality" value={opt} checked={formData.nationality === opt} onChange={handleInputChange} className="hidden" />
                          {opt === 'aussie' ? 'Australian' : 'International'}
                        </label>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.nationality === 'other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:col-span-2 overflow-hidden"
                      >
                        <div className="grid md:grid-cols-3 gap-8 pt-6">
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Visa Type</label>
                            <input type="text" name="visa" value={formData.visa} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="e.g. Student (500)" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">University / Institution</label>
                            <input type="text" name="universityName" value={formData.universityName} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="Name of institution" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Course / Field of Study</label>
                            <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="Your course" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-10 border-t border-outline-variant/10 flex justify-end">
                  <button onClick={nextStep} className="group relative bg-primary text-on-primary px-10 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all overflow-hidden active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">Continue <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span></span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-1">
                  <h2 className="text-3xl font-space-grotesk font-bold text-primary">Tenancy Details</h2>
                  <p className="text-outline text-sm">When would you like to move in and for how long?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Preferred Move-in Date</label>
                    <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all ${errors.moveInDate ? 'border-red-500/50' : 'border-outline-variant focus:border-primary'}`} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Stay Duration</label>
                    <select name="lengthOfStay" value={formData.lengthOfStay} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant focus:border-primary appearance-none">
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-6 md:col-span-2 bg-surface-container-low p-8 rounded-[2rem]">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-outline">Lifestyle Preferences</p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <span className="text-sm font-bold text-primary">Do you smoke?</span>
                        <div className="flex gap-4">
                          {['no', 'yes'].map((opt) => (
                            <label key={opt} className={`flex-1 text-center py-3 rounded-2xl border-2 cursor-pointer transition-all font-bold text-[10px] uppercase tracking-widest ${formData.smoking === opt ? 'bg-primary border-primary text-on-primary shadow-lg' : 'bg-surface-container-lowest border-outline-variant/30 text-outline hover:border-secondary'}`}>
                              <input type="radio" name="smoking" value={opt} checked={formData.smoking === opt} onChange={handleInputChange} className="hidden" />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <span className="text-sm font-bold text-primary">Do you have pets?</span>
                        <div className="flex gap-4">
                          {['no', 'yes'].map((opt) => (
                            <label key={opt} className={`flex-1 text-center py-3 rounded-2xl border-2 cursor-pointer transition-all font-bold text-[10px] uppercase tracking-widest ${formData.pets === opt ? 'bg-primary border-primary text-on-primary shadow-lg' : 'bg-surface-container-lowest border-outline-variant/30 text-outline hover:border-secondary'}`}>
                              <input type="radio" name="pets" value={opt} checked={formData.pets === opt} onChange={handleInputChange} className="hidden" />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <p className="text-sm font-bold text-primary">Rental History Experience</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all ${formData.rentalExperience === 'yes' ? 'bg-primary border-primary text-on-primary shadow-xl shadow-primary/10' : 'bg-surface-container-lowest border-outline-variant/30 text-primary'}`}>
                        <input type="radio" name="rentalExperience" value="yes" checked={formData.rentalExperience === 'yes'} onChange={handleInputChange} className="hidden" />
                        <span className="material-symbols-outlined mb-2 block text-[24px]">history</span>
                        <p className="font-bold text-xs uppercase tracking-widest">I have rented before</p>
                      </label>
                      <label className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all ${formData.rentalExperience === 'no' ? 'bg-primary border-primary text-on-primary shadow-xl shadow-primary/10' : 'bg-surface-container-lowest border-outline-variant/30 text-primary'}`}>
                        <input type="radio" name="rentalExperience" value="no" checked={formData.rentalExperience === 'no'} onChange={handleInputChange} className="hidden" />
                        <span className="material-symbols-outlined mb-2 block text-[24px]">person_off</span>
                        <p className="font-bold text-xs uppercase tracking-widest">I haven't rented before</p>
                      </label>
                    </div>

                    <AnimatePresence>
                      {formData.rentalExperience === 'yes' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-10 pt-6">
                          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] shadow-sm">
                            <div className="space-y-3">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Reference Name</label>
                              <input type="text" name="rentalReferenceName" value={formData.rentalReferenceName} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="Agent or Landlord" />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Contact Phone</label>
                              <input type="tel" name="rentalReferencePhone" value={formData.rentalReferencePhone} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="0400 000 000" />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Stay Duration *</label>
                              <input type="text" name="rentalStayDuration" value={formData.rentalStayDuration} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all ${errors.rentalStayDuration ? 'border-red-500/50' : 'border-outline-variant/30 focus:border-primary'}`} placeholder="e.g. 1 year" />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Reason to leave</label>
                              <input type="text" name="rentalReasonToLeave" value={formData.rentalReasonToLeave} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="e.g. Relocation" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-10 border-t border-outline-variant/10 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] text-outline hover:text-primary transition-all">Back</button>
                  <button onClick={nextStep} className="group relative bg-primary text-on-primary px-10 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-1">
                  <h2 className="text-3xl font-space-grotesk font-bold text-primary">Background & Reference</h2>
                  <p className="text-outline text-sm">Tell us about your current status and who to contact in emergencies.</p>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-sm font-bold text-primary">Employment Status</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['full-time', 'part-time', 'casual', 'study'].map((opt) => (
                        <label key={opt} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center ${formData.employmentStatus === opt ? 'bg-primary border-primary text-on-primary shadow-xl shadow-primary/10' : 'bg-surface-container-lowest border-outline-variant/30 text-outline hover:border-secondary'}`}>
                          <input type="radio" name="employmentStatus" value={opt} checked={formData.employmentStatus === opt} onChange={handleInputChange} className="hidden" />
                          <p className="font-bold text-[10px] uppercase tracking-widest capitalize">{opt}</p>
                        </label>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {formData.employmentStatus === 'study' ? (
                      <motion.div key="study" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-10 bg-surface-container-low rounded-[2.5rem] space-y-10 border border-outline-variant/10">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-outline">Education Details</p>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">University / Institution</label>
                            <input type="text" name="universityName" value={formData.universityName} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="University of Melbourne" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Field of Study</label>
                            <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="Bachelor of Design" />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-10 bg-surface-container-low rounded-[2.5rem] space-y-10 border border-outline-variant/10">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-outline">Employment Reference</p>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                          <div className="space-y-3 md:col-span-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Occupation or Job Title</label>
                            <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="Software Engineer" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Company / Manager Name</label>
                            <input type="text" name="employerName" value={formData.employerName} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="Acme Corp" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Contact Phone</label>
                            <input type="tel" name="employerPhone" value={formData.employerPhone} onChange={handleInputChange} className="w-full bg-transparent border-b-2 py-2 text-lg outline-none border-outline-variant/30 focus:border-primary" placeholder="0400 000 000" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] space-y-10">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Emergency Contact</p>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Contact Name</label>
                        <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all ${errors.emergencyContactName ? 'border-red-500/50' : 'border-outline-variant/30 focus:border-primary'}`} placeholder="Name" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Contact Phone</label>
                        <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleInputChange} className={`w-full bg-transparent border-b-2 py-2 text-lg outline-none transition-all ${errors.emergencyContactPhone ? 'border-red-500/50' : 'border-outline-variant/30 focus:border-primary'}`} placeholder="0400 000 000" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-outline-variant/10 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] text-outline hover:text-primary transition-all">Back</button>
                  <button onClick={nextStep} className="bg-primary text-on-primary px-10 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-1">
                  <h2 className="text-3xl font-space-grotesk font-bold text-primary">Review & Documents</h2>
                  <p className="text-outline text-sm">Upload your supporting documents and confirm your application.</p>
                </div>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Minimal File Upload */}
                    <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all text-center space-y-4 ${files['id_proof'] ? 'bg-secondary/5 border-secondary/20' : errors.id_proof ? 'bg-red-50/10 border-red-500/50' : 'bg-surface-container-low border-outline-variant/30 hover:border-secondary'}`}>
                      <span className={`material-symbols-outlined text-[32px] ${errors.id_proof ? 'text-red-500/70' : 'text-outline'}`}>{files['id_proof'] ? 'check_circle' : 'file_upload'}</span>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-primary">Identity Verification (Required)</p>
                        <p className="text-[10px] text-outline uppercase tracking-widest font-bold">Driver's License or Passport</p>
                        {errors.id_proof && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest pt-1">{errors.id_proof}</p>}
                      </div>
                      <input type="file" id="id_proof" onChange={(e) => handleFileChange(e, 'id_proof')} className="hidden" />
                      <label htmlFor="id_proof" className={`inline-block px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-all ${files['id_proof'] ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/10' : 'bg-surface-container-lowest border border-outline-variant/30 text-primary'}`}>
                        {files['id_proof'] ? 'File Selected' : 'Select File'}
                      </label>
                    </div>

                    <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all text-center space-y-4 ${files['income_proof'] ? 'bg-secondary/5 border-secondary/20' : 'bg-surface-container-low border-outline-variant/30 hover:border-secondary'}`}>
                      <span className="material-symbols-outlined text-[32px] text-outline">{files['income_proof'] ? 'check_circle' : 'receipt_long'}</span>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-primary">Income Verification</p>
                        <p className="text-[10px] text-outline uppercase tracking-widest font-bold">Payslips or Bank Statement</p>
                      </div>
                      <input type="file" id="income_proof" onChange={(e) => handleFileChange(e, 'income_proof')} className="hidden" />
                      <label htmlFor="income_proof" className={`inline-block px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-all ${files['income_proof'] ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/10' : 'bg-surface-container-lowest border border-outline-variant/30 text-primary'}`}>
                        {files['income_proof'] ? 'File Selected' : 'Select File'}
                      </label>
                    </div>
                  </div>

                  <div className="p-10 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 space-y-10">
                    <div className="space-y-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Source of Rent Payment (Select all that apply)</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['salary', 'parental', 'savings', 'government'].map((opt) => (
                          <div
                            key={opt}
                            onClick={() => handleMultiSelectChange('incomeSource', opt)}
                            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center ${Array.isArray(formData.incomeSource) && formData.incomeSource.includes(opt)
                                ? 'bg-primary border-primary text-on-primary shadow-lg shadow-primary/10'
                                : 'bg-surface-container-lowest border-outline-variant/30 text-outline hover:border-secondary'
                              }`}
                          >
                            <p className="font-bold text-[9px] uppercase tracking-widest leading-none">{opt}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-outline-variant/30">
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-primary leading-relaxed">
                          Do you foresee any changes in your financial situation that would impact rent?
                        </p>
                        <div className="flex gap-6">
                          {['no', 'yes'].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.financialChanges === opt ? 'border-primary' : 'border-outline-variant/30'}`}>
                                {formData.financialChanges === opt && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                              </div>
                              <input type="radio" name="financialChanges" value={opt} checked={formData.financialChanges === opt} onChange={handleInputChange} className="hidden" />
                              <span className="text-xs uppercase font-bold tracking-widest text-outline group-hover:text-primary transition-colors">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {formData.financialChanges === 'yes' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 overflow-hidden">
                            <textarea name="financialChangesDetails" value={formData.financialChangesDetails} onChange={handleInputChange} rows={2} className="w-full bg-transparent border-b-2 py-2 text-sm outline-none border-outline-variant/30 focus:border-primary transition-all" placeholder="Please provide details..." />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Additional Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-transparent border-b-2 py-2 text-sm outline-none border-outline-variant/30 focus:border-primary transition-all" placeholder="Any additional information..." />
                  </div>
                </div>

                <div className="pt-10 border-t border-outline-variant/10 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] text-outline hover:text-primary transition-all">Back</button>
                  <button onClick={handleSubmit} disabled={submitting} className="bg-primary text-on-primary px-12 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all disabled:opacity-50 active:scale-95">
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
                className="text-center py-20 space-y-8"
              >
                <div className="w-24 h-24 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/20">
                  <span className="material-symbols-outlined text-[48px] animate-[bounce_1s_ease-in-out_infinite]">check</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-space-grotesk font-bold text-primary">Application Received</h2>
                  <p className="text-outline text-sm max-w-sm mx-auto">
                    We've received your application for {room?.name}. Our team will review your details and contact you shortly.
                  </p>
                </div>
                <button onClick={() => router.push('/tenant')} className="inline-block bg-surface-container-high text-primary px-10 py-5 rounded-3xl font-bold uppercase tracking-widest text-[11px] hover:bg-surface-container-highest transition-all shadow-lg shadow-black/5">
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
