'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioPage() {
  const supabase = createClient()
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase
        .from('properties')
        .select(`
          *,
          rooms (id, status, rent_amount),
          documents (storage_path, document_type)
        `)
        .order('created_at', { ascending: false })
      
      setProperties(data || [])
      setLoading(false)
    }
    fetchProperties()
  }, [])

  const getImageUrl = (path: string) => {
    if (!path) return null
    const { data } = supabase.storage.from('documents').getPublicUrl(path)
    return data.publicUrl
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-outline-variant/10">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-background tracking-tighter">Portfolio</h2>
          <div className="flex gap-10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold opacity-60">Active Listings</span>
              <span className="text-2xl font-headline font-bold text-on-background">{properties.length}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold opacity-60">Occupancy</span>
              <span className="text-2xl font-headline font-bold text-primary">
                {properties.length > 0 ? Math.round((properties.reduce((acc, p) => acc + (p.rooms?.filter((r: any) => r.status === 'occupied').length || 0), 0) / 
                  properties.reduce((acc, p) => acc + (p.rooms?.length || 1), 0)) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
        <Link 
          href="/admin/properties/add"
          className="bg-on-background text-surface px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-on-background/10 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add Property
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {/* Desktop Header Row */}
        <div className="hidden lg:grid grid-cols-[80px_1fr_120px_120px_100px] gap-8 px-10 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-outline opacity-60">
          <div>Image</div>
          <div>Property</div>
          <div>Occupancy</div>
          <div>Yield</div>
          <div className="text-right">Action</div>
        </div>

        <div className="space-y-4">
          {properties.map((prop, index) => {
            const heroImage = prop.documents?.find((d: any) => d.document_type === 'property_image')?.storage_path
            const occupiedRooms = prop.rooms?.filter((r: any) => r.status === 'occupied').length || 0
            const totalRooms = prop.rooms?.length || 0
            const totalRent = prop.rooms?.reduce((acc: number, r: any) => acc + (Number(r.rent_amount) || 0), 0)

            return (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-surface-container-lowest lg:bg-transparent border border-outline-variant/10 lg:border-none rounded-[2rem] lg:rounded-none overflow-hidden"
              >
                <div className="lg:grid lg:grid-cols-[80px_1fr_120px_120px_100px] gap-8 px-6 py-6 lg:px-10 lg:py-8 items-center lg:border-b lg:border-outline-variant/10 hover:bg-surface-container-low transition-all">
                  {/* Image */}
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-surface-container-high rounded-2xl overflow-hidden relative mb-6 lg:mb-0">
                    {heroImage ? (
                      <img 
                        src={getImageUrl(heroImage)!} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={prop.address}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline/20">
                        <span className="material-symbols-outlined text-3xl">home</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mb-6 lg:mb-0">
                    <h3 className="text-xl lg:text-2xl font-headline font-bold text-on-background tracking-tight group-hover:text-primary transition-colors">{prop.address}</h3>
                    <p className="text-xs text-outline font-bold uppercase tracking-widest mt-1 opacity-60">{prop.city} • {prop.property_type}</p>
                  </div>

                  {/* Mobile-only Stats Grid */}
                  <div className="grid grid-cols-2 lg:hidden gap-6 mb-8 pt-6 border-t border-outline-variant/5">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-outline font-bold block">Occupancy</span>
                      <span className="text-base font-bold text-on-surface">{occupiedRooms}/{totalRooms} Rooms</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-outline font-bold block">Total Yield</span>
                      <span className="text-base font-bold text-primary">${totalRent}/pw</span>
                    </div>
                  </div>

                  {/* Desktop Stats */}
                  <div className="hidden lg:block font-bold text-on-surface text-sm">
                    <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] uppercase tracking-widest">
                      {occupiedRooms}/{totalRooms} Occupied
                    </span>
                  </div>
                  <div className="hidden lg:block font-headline font-bold text-primary text-lg">
                    ${totalRent}/pw
                  </div>

                  {/* Action */}
                  <div className="text-left lg:text-right">
                    <Link 
                      href={`/admin/properties/${prop.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-on-background transition-colors no-underline group/link"
                    >
                      Manage
                      <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {properties.length === 0 && (
          <div className="py-32 text-center border-2 border-dashed border-outline-variant/10 rounded-[3rem] bg-surface-container-lowest/30">
            <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6 text-outline/30">
              <span className="material-symbols-outlined text-3xl">domain_disabled</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-background mb-2">No properties yet</h3>
            <p className="text-sm text-outline mb-10 max-w-xs mx-auto">Start building your portfolio by adding your first property asset.</p>
            <Link 
              href="/admin/properties/add"
              className="bg-on-background text-surface px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
