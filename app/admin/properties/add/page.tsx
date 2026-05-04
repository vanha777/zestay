'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AddPropertyPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    address: '',
    city: 'Melbourne',
    state: 'VIC',
    zip_code: '',
    property_type: 'House',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. Create Property
    const { data: property, error: propError } = await supabase
      .from('properties')
      .insert([
        {
          ...formData,
          status: 'available'
        }
      ])
      .select()
      .single()

    if (propError) {
      alert(propError.message)
      setLoading(false)
      return
    }

    // 2. Upload Image if exists
    if (file && property) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${property.id}/${Math.random()}.${fileExt}`
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('documents')
        .upload(fileName, file)

      if (uploadError) {
        alert('Image upload failed: ' + uploadError.message)
      } else {
        // 3. Link Image to Property in documents table
        await supabase.from('documents').insert([
          {
            name: file.name,
            storage_path: uploadData.path,
            document_type: 'property_image',
            property_id: property.id,
            mime_type: file.type
          }
        ])
      }
    }

    router.push('/admin/portfolio')
    setLoading(false)
  }

  return (
    <div className="p-12 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
      <header className="mb-12">
        <h2 className="text-4xl font-headline font-bold text-on-background tracking-tighter mb-2">Add New Property</h2>
        <p className="text-primary font-body font-light italic">Expand your Melbourne portfolio.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Property Hero Image</label>
            <div className="relative group">
              <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-surface-container-high border-2 border-dashed border-outline-variant rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group-hover:border-primary/50 transition-all">
                {file ? (
                  <>
                    <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                    <span className="text-sm font-bold text-on-surface">{file.name}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-outline text-3xl">add_a_photo</span>
                    <span className="text-sm font-bold text-outline">Upload Property Image</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Full Address</label>
            <input 
              required
              className="bg-surface-container-high border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="e.g. 123 Elgin Street"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Suburb</label>
              <input 
                required
                className="bg-surface-container-high border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="e.g. Carlton"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Postcode</label>
              <input 
                required
                className="bg-surface-container-high border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="3053"
                value={formData.zip_code}
                onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Property Type</label>
              <select 
                className="bg-surface-container-high border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                value={formData.property_type}
                onChange={(e) => setFormData({...formData, property_type: e.target.value})}
              >
                <option>House</option>
                <option>Apartment</option>
                <option>Townhouse</option>
                <option>Studio</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button 
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-4 border border-outline-variant text-on-background rounded-xl font-bold hover:bg-surface-container-high transition-all uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 py-4 bg-on-background text-surface rounded-xl font-bold hover:opacity-90 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  )
}
