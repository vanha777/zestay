'use client'

import { useState } from 'react'
import Link from 'next/link'
import { updateApplicationStatus, updateApplicationNotes } from '../actions'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ApplicantDetailClient({ 
  id, 
  applicantData, 
  application, 
  property, 
  room, 
  docs,
  publicUrls
}: any) {
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [notes, setNotes] = useState(application.notes || '')
  const [savingNotes, setSavingNotes] = useState(false)
  const router = useRouter()

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (!confirm(`Are you sure you want to ${status} this applicant?`)) return
    
    setSubmitting(status)
    const result = await updateApplicationStatus(id, status)
    setSubmitting(null)

    if (result.error) {
      alert(result.error)
    } else {
      router.refresh()
    }
  }

  const handleSaveNotes = async () => {
    setSavingNotes(true)
    const result = await updateApplicationNotes(id, notes)
    setSavingNotes(false)

    if (result.error) {
      alert(result.error)
    } else {
      alert('Notes saved successfully!')
    }
  }

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 pb-32">
      {/* Navigation */}
      <nav className="mb-8">
        <Link href="/admin/applicants" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-primary transition-all group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Applicants
        </Link>
      </nav>

      {/* Header Profile Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-12 border-b border-outline-variant/10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-container flex items-center justify-center text-primary text-3xl md:text-4xl font-bold font-headline shadow-xl border-4 border-surface flex-shrink-0">
            {applicantData.firstName[0]}{applicantData.lastName[0]}
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-on-background leading-none">
              {applicantData.firstName} {applicantData.lastName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-on-surface-variant">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">mail</span>
                {applicantData.email}
              </span>
              <span className="hidden md:block w-1 h-1 bg-outline-variant/30 rounded-full"></span>
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">call</span>
                {applicantData.phone}
              </span>
              <span className="w-full md:w-auto mt-2 md:mt-0">
                <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                  application.status === 'approved' ? 'bg-green-100 text-green-700' : 
                  application.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                  'bg-primary/10 text-primary'
                }`}>
                  {application.status}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto pt-6 lg:pt-0">
          <button 
            onClick={() => handleStatusUpdate('rejected')}
            disabled={!!submitting || application.status === 'rejected'}
            className="flex-1 lg:flex-none bg-surface-container-high text-on-surface-variant px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-all disabled:opacity-50"
          >
            {submitting === 'rejected' ? '...' : 'Reject'}
          </button>
          <button 
            onClick={() => handleStatusUpdate('approved')}
            disabled={!!submitting || application.status === 'approved'}
            className="flex-1 lg:flex-none bg-on-background text-surface px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-on-background/10 disabled:opacity-50"
          >
            {submitting === 'approved' ? '...' : 'Approve'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Personal & Application Info */}
        <div className="lg:col-span-2 space-y-12">
          {/* Application Context Card */}
          <section className="bg-surface-container p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-8 opacity-60">Application Intent</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-headline font-bold text-on-background mb-1">{room.name || 'Entire Property'}</h3>
                <p className="text-on-surface-variant font-medium text-sm">{property.address}, {property.city}</p>
              </div>
              <div className="md:text-right pt-6 md:pt-0 border-t md:border-none border-outline-variant/5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-outline block mb-1 opacity-60">Weekly Yield</span>
                <span className="text-3xl font-headline font-bold text-primary">${room.rent_amount || 'TBD'}</span>
              </div>
            </div>
          </section>

          {/* Detailed Profile Grid */}
          <section className="bg-surface-container-lowest p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-10 opacity-60">Candidate Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              {[
                { label: 'Occupation', value: applicantData.occupation },
                { label: 'Date of Birth', value: applicantData.dob },
                { label: 'Emergency Contact', value: applicantData.emergencyContact },
                { label: 'Emergency Phone', value: applicantData.emergencyPhone },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[9px] font-bold text-outline uppercase tracking-widest block opacity-60">{item.label}</span>
                  <span className="text-lg font-bold text-on-background">{item.value || 'N/A'}</span>
                </div>
              ))}
              <div className="md:col-span-2 space-y-3 pt-8 border-t border-outline-variant/5">
                <span className="text-[9px] font-bold text-outline uppercase tracking-widest block opacity-60">Applicant Statement</span>
                <p className="text-on-surface-variant leading-relaxed font-medium italic bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
                  "{applicantData.notes || 'No statement provided.'}"
                </p>
              </div>
            </div>
          </section>

          {/* Verification Assets */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-60 ml-2">Verification Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docs.length > 0 ? docs.map((doc: any) => (
                <a 
                  key={doc.id}
                  href={publicUrls[doc.id]}
                  target="_blank"
                  className="flex items-center gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5 hover:border-primary/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">fingerprint</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-on-background truncate uppercase tracking-widest">{doc.document_type?.replace('_', ' ') || doc.name}</p>
                    <p className="text-[9px] text-outline font-bold uppercase tracking-[0.1em] opacity-60 mt-0.5" suppressHydrationWarning>
                      {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-lg">open_in_new</span>
                </a>
              )) : (
                <div className="md:col-span-2 p-12 text-center border-2 border-dashed border-outline-variant/10 rounded-[2.5rem] text-outline italic text-sm">
                  No verification documents provided.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Decisions & Intelligence */}
        <div className="space-y-8">
          {/* Intelligence Score Card */}
          <section className="bg-on-background text-surface p-8 rounded-[2.5rem] shadow-2xl shadow-on-background/10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-6">Vetting Intelligence</h2>
            <div className="space-y-8">
              <div className="flex items-end justify-between">
                <span className="text-5xl font-headline font-bold tracking-tighter">
                  {application.status === 'approved' ? '100' : '45'}<span className="text-xl opacity-40">%</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 pb-2">Verification Score</span>
              </div>
              <div className="h-1.5 w-full bg-surface/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-surface rounded-full transition-all duration-1000" 
                  style={{ width: application.status === 'approved' ? '100%' : '45%' }}
                ></div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-surface/10">
                {[
                  { label: 'Identity Check', done: true },
                  { label: 'Income Verification', done: true },
                  { label: 'Behavioral Check', done: application.status === 'approved' },
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-sm ${check.done ? 'text-surface' : 'text-surface/30'}`}>
                      {check.done ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${check.done ? 'opacity-100' : 'opacity-30'}`}>{check.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Internal Ledger / Notes */}
          <section className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-6 opacity-60">Internal Ledger</h2>
            <textarea 
              className="w-full bg-surface-container-high rounded-2xl p-6 text-sm font-medium text-on-surface placeholder:text-outline-variant outline-none border-none focus:ring-2 focus:ring-primary/10 h-48 resize-none"
              placeholder="Record private observations or background check results..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button 
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="w-full mt-6 py-4 bg-on-background text-surface rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-on-background/5"
            >
              {savingNotes ? 'Syncing...' : 'Save Notes'}
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
