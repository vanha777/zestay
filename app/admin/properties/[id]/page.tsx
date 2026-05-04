'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ManagePropertyPage() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createClient()
  
  const [property, setProperty] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addingRoom, setAddingRoom] = useState(false)
  const [roomFile, setRoomFile] = useState<File | null>(null)
  const [newRoom, setNewRoom] = useState({
    name: '',
    rent_amount: '',
    status: 'available'
  })

  useEffect(() => {
    async function fetchData() {
      const { data: propData } = await supabase
        .from('properties')
        .select(`
          *,
          documents (storage_path)
        `)
        .eq('id', id)
        .single()
      
      const { data: roomsData } = await supabase
        .from('rooms')
        .select(`
          *,
          documents (storage_path)
        `)
        .eq('property_id', id)
      
      setProperty(propData)
      setRooms(roomsData || [])
      setLoading(false)
    }
    fetchData()
  }, [id])

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: room, error } = await supabase
      .from('rooms')
      .insert([
        {
          ...newRoom,
          property_id: id,
          rent_amount: parseFloat(newRoom.rent_amount)
        }
      ])
      .select()
      .single()
    
    if (error) {
      alert(error.message)
    } else {
      if (roomFile && room) {
        const fileExt = roomFile.name.split('.').pop()
        const fileName = `rooms/${room.id}/${Math.random()}.${fileExt}`
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('documents')
          .upload(fileName, roomFile)

        if (!uploadError) {
          await supabase.from('documents').insert([
            {
              name: roomFile.name,
              storage_path: uploadData.path,
              document_type: 'room_image',
              room_id: room.id,
              mime_type: roomFile.type
            }
          ])
        }
      }

      setAddingRoom(false)
      setRoomFile(null)
      setNewRoom({ name: '', rent_amount: '', status: 'available' })
      
      const { data } = await supabase.from('rooms').select('*, documents(storage_path)').eq('property_id', id)
      setRooms(data || [])
    }
    setLoading(false)
  }

  const getImageUrl = (path: string) => {
    if (!path) return null
    const { data } = supabase.storage.from('documents').getPublicUrl(path)
    return data.publicUrl
  }

  if (loading && !property) return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  )

  if (!property) return <div className="p-12 text-center font-headline text-2xl">Property not found.</div>

  const heroImage = property.documents?.find((d: any) => d.document_type === 'property_image' || !d.document_type)?.storage_path

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-12">
      <nav className="mb-8">
        <Link href="/admin/portfolio" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-primary transition-all group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Portfolio
        </Link>
      </nav>

      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-12 border-b border-outline-variant/10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-surface-container-high rounded-[2.5rem] overflow-hidden relative shadow-xl shadow-on-background/5 flex-shrink-0">
            {heroImage ? (
              <img src={getImageUrl(heroImage)!} className="w-full h-full object-cover" alt="Property Hero" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-outline/30">
                <span className="material-symbols-outlined text-4xl">image</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-background tracking-tighter leading-none">{property.address}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">{property.property_type}</span>
              <span className="text-xs text-outline font-medium">{property.city}</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto bg-surface-container p-6 rounded-[2rem] border border-outline-variant/5">
          <span className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold block mb-1 opacity-60">Property Yield</span>
          <span className="text-3xl font-headline font-bold text-on-background">
            ${rooms.reduce((acc, r) => acc + (Number(r.rent_amount) || 0), 0)}<span className="text-sm font-body text-outline">/pw</span>
          </span>
        </div>
      </header>

      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-headline font-bold text-on-background">Rooms</h3>
          <button 
            onClick={() => setAddingRoom(true)}
            className="w-10 h-10 md:w-auto md:px-6 md:py-3 bg-on-background text-surface rounded-full md:rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-on-background/10"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="hidden md:inline">Add Room</span>
          </button>
        </div>

        <AnimatePresence>
          {addingRoom && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-primary/20 mb-12 shadow-2xl shadow-primary/5">
                <form onSubmit={handleAddRoom} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Room Name</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all focus:bg-surface-container"
                        placeholder="e.g. Master Suite"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Weekly Rent</label>
                      <input 
                        required
                        type="number"
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all focus:bg-surface-container"
                        placeholder="350"
                        value={newRoom.rent_amount}
                        onChange={(e) => setNewRoom({...newRoom, rent_amount: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Room Image</label>
                    <div className="relative group">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setRoomFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="bg-surface-container-low rounded-2xl p-6 border-2 border-dashed border-outline-variant/30 group-hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">cloud_upload</span>
                        <span className="text-xs font-bold text-outline uppercase tracking-widest">
                          {roomFile ? roomFile.name : 'Upload internal room photo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-4">
                    <button 
                      type="button"
                      onClick={() => setAddingRoom(false)}
                      className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-on-background transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="px-10 bg-primary text-on-primary py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                    >
                      {loading ? 'Processing...' : 'Add Room'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-6">
          {rooms.map((room) => {
            const roomImage = room.documents?.find((d: any) => d.document_type === 'room_image' || !d.document_type)?.storage_path
            return (
              <div key={room.id} className="bg-surface-container-lowest p-6 md:p-8 rounded-[2.5rem] border border-outline-variant/5 hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-on-background/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-surface-container-high rounded-[1.5rem] overflow-hidden relative shadow-inner">
                      {roomImage ? (
                        <img src={getImageUrl(roomImage)!} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={room.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline/20">
                          <span className="material-symbols-outlined text-2xl">bed</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-headline text-on-background tracking-tight">{room.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${room.status === 'available' ? 'bg-green-500' : 'bg-amber-500'}`} />
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline opacity-60">{room.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-12 pt-6 md:pt-0 border-t md:border-none border-outline-variant/5">
                    <div className="text-left md:text-right">
                      <span className="text-[9px] uppercase tracking-widest text-outline font-bold block mb-1 opacity-60">Weekly Rate</span>
                      <span className="text-2xl font-headline font-bold text-on-background">${room.rent_amount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          const link = `https://www.zestay.au/property/${id}/room/${room.id}/apply`
                          navigator.clipboard.writeText(link)
                          alert('Application link copied to clipboard!')
                        }}
                        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:bg-primary hover:text-on-primary transition-all"
                        title="Copy Application Link"
                      >
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:bg-red-50 hover:text-red-600 transition-all">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
