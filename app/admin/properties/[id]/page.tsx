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

  // Edit States
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editFile, setEditFile] = useState<File | null>(null)
  const [editData, setEditData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const { data: propData } = await supabase
        .from('properties')
        .select(`
          *,
          documents (storage_path, created_at, document_type)
        `)
        .eq('id', id)
        .single()
      
      const { data: roomsData } = await supabase
        .from('rooms')
        .select(`
          *,
          documents (storage_path, created_at, document_type)
        `)
        .eq('property_id', id)
      
      if (propData?.documents) {
        propData.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }
      
      if (roomsData) {
        roomsData.forEach((r: any) => {
          if (r.documents) {
            r.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          }
        })
      }
      
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
      
      const { data } = await supabase.from('rooms').select('*, documents(storage_path, created_at, document_type)').eq('property_id', id)
      if (data) {
        data.forEach((r: any) => {
          if (r.documents) {
            r.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          }
        })
      }
      setRooms(data || [])
    }
    setLoading(false)
  }

  const handleUpdateProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const { error } = await supabase
        .from('properties')
        .update({
          address: editData.address,
          city: editData.city,
          property_type: editData.property_type,
          state: editData.state,
          zip_code: editData.zip_code
        })
        .eq('id', id)

      if (error) throw error

      if (editFile) {
        const fileExt = editFile.name.split('.').pop()
        const fileName = `properties/${id}/${Math.random()}.${fileExt}`
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('documents')
          .upload(fileName, editFile)

        if (!uploadError) {
          // Mark old images as something else or just add new one
          await supabase.from('documents').insert([
            {
              name: editFile.name,
              storage_path: uploadData.path,
              document_type: 'property_image',
              property_id: id,
              mime_type: editFile.type
            }
          ])
        }
      }

      setIsEditPropertyOpen(false)
      setEditFile(null)
      router.refresh()
      
      // Refresh local state
      const { data } = await supabase.from('properties').select('*, documents(storage_path, created_at, document_type)').eq('id', id).single()
      if (data?.documents) {
        data.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }
      setProperty(data)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const { error } = await supabase
        .from('rooms')
        .update({
          name: editData.name,
          rent_amount: parseFloat(editData.rent_amount),
          status: editData.status
        })
        .eq('id', editingRoom.id)

      if (error) throw error

      if (editFile) {
        const fileExt = editFile.name.split('.').pop()
        const fileName = `rooms/${editingRoom.id}/${Math.random()}.${fileExt}`
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('documents')
          .upload(fileName, editFile)

        if (!uploadError) {
          await supabase.from('documents').insert([
            {
              name: editFile.name,
              storage_path: uploadData.path,
              document_type: 'room_image',
              room_id: editingRoom.id,
              mime_type: editFile.type
            }
          ])
        }
      }

      setEditingRoom(null)
      setEditFile(null)
      
      // Refresh local state
      const { data } = await supabase.from('rooms').select('*, documents(storage_path, created_at, document_type)').eq('property_id', id)
      if (data) {
        data.forEach((r: any) => {
          if (r.documents) {
            r.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          }
        })
      }
      setRooms(data || [])
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return
    setLoading(true)
    const { error } = await supabase.from('rooms').delete().eq('id', roomId)
    if (error) alert(error.message)
    else {
      setRooms(rooms.filter(r => r.id !== roomId))
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
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-background tracking-tighter leading-none">{property.address}</h2>
              <button 
                onClick={() => {
                  setEditData(property)
                  setIsEditPropertyOpen(true)
                }}
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:bg-primary hover:text-on-primary transition-all"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
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
                      <button 
                        onClick={() => {
                          setEditData(room)
                          setEditingRoom(room)
                        }}
                        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:bg-primary hover:text-on-primary transition-all"
                        title="Edit Room"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteRoom(room.id)}
                        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:bg-red-50 hover:text-red-600 transition-all"
                        title="Delete Room"
                      >
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

      {/* Property Edit Modal */}
      <AnimatePresence>
        {isEditPropertyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditPropertyOpen(false)}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[3rem] p-10 md:p-14 shadow-2xl border border-outline-variant/10 overflow-hidden"
            >
              <div className="space-y-10">
                <div>
                  <h3 className="text-3xl font-headline font-bold text-on-background tracking-tighter">Edit Property</h3>
                  <p className="text-sm text-outline mt-1">Update property details and primary identification.</p>
                </div>

                <form onSubmit={handleUpdateProperty} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Address</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all"
                        value={editData.address}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">City</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all"
                        value={editData.city}
                        onChange={(e) => setEditData({...editData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Property Type</label>
                      <select 
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all appearance-none"
                        value={editData.property_type}
                        onChange={(e) => setEditData({...editData, property_type: e.target.value})}
                      >
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Studio">Studio</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">New Hero Image</label>
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setEditFile(e.target.files[0])}
                        className="w-full text-xs text-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-primary file:text-on-primary"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-6 border-t border-outline-variant/10">
                    <button 
                      type="button"
                      onClick={() => setIsEditPropertyOpen(false)}
                      className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-on-background transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isUpdating}
                      className="px-10 bg-on-background text-surface py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isUpdating ? 'Saving...' : 'Update Property'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Room Edit Modal */}
      <AnimatePresence>
        {editingRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingRoom(null)}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[3rem] p-10 md:p-14 shadow-2xl border border-outline-variant/10 overflow-hidden"
            >
              <div className="space-y-10">
                <div>
                  <h3 className="text-3xl font-headline font-bold text-on-background tracking-tighter">Edit Room</h3>
                  <p className="text-sm text-outline mt-1">Adjust room name, pricing and status.</p>
                </div>

                <form onSubmit={handleUpdateRoom} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Room Name</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Weekly Rent</label>
                      <input 
                        required
                        type="number"
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all"
                        value={editData.rent_amount}
                        onChange={(e) => setEditData({...editData, rent_amount: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Status</label>
                      <select 
                        className="w-full bg-surface-container-low border-b-2 border-transparent focus:border-primary rounded-t-2xl px-6 py-4 text-on-surface outline-none transition-all appearance-none"
                        value={editData.status}
                        onChange={(e) => setEditData({...editData, status: e.target.value})}
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">New Room Image</label>
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setEditFile(e.target.files[0])}
                        className="w-full text-xs text-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-primary file:text-on-primary"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-6 border-t border-outline-variant/10">
                    <button 
                      type="button"
                      onClick={() => setEditingRoom(null)}
                      className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-on-background transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isUpdating}
                      className="px-10 bg-on-background text-surface py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isUpdating ? 'Saving...' : 'Update Room'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
