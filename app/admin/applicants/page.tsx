import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function ApplicantsPage() {
  const supabase = await createClient()

  const { data: dbApplications, error } = await supabase
    .from('applications')
    .select(`
      *,
      profiles:tenant_id (
        first_name,
        last_name,
        email
      ),
      properties:property_id (
        address,
        city
      ),
      rooms:room_id (
        name
      )
    `)
    .order('applied_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
  }

  // MOCK DATA for demonstration if DB is empty
  const mockApplicants = [
    {
      id: '1',
      status: 'pending',
      applied_at: new Date().toISOString(),
      profiles: { first_name: 'Sarah', last_name: 'Jenkins', email: 'sarah@example.com' },
      properties: { address: '123 Elgin St', city: 'Carlton' },
      personal_info: { employment: 'Full-time', income: 110000, credit_score: 780 },
      vetting_progress: 80,
    },
    {
      id: '2',
      status: 'pending',
      applied_at: new Date().toISOString(),
      profiles: { first_name: 'Michael', last_name: 'Chen', email: 'michael@example.com' },
      properties: { address: '45 Domain Rd', city: 'South Yarra' },
      personal_info: { employment: 'Full-time', income: 92000, credit_score: 720 },
      vetting_progress: 10,
    },
    {
      id: '3',
      status: 'approved',
      applied_at: new Date().toISOString(),
      profiles: { first_name: 'Jessica', last_name: 'Wong', email: 'jessica@example.com' },
      properties: { address: '88 Gertrude St', city: 'Fitzroy' },
      personal_info: { employment: 'Self-employed', income: 145000, credit_score: 810 },
      vetting_progress: 100,
    }
  ]

  const displayApplicants = dbApplications && dbApplications.length > 0 ? dbApplications : mockApplicants
  const pendingCount = displayApplicants.filter(app => app.status === 'pending').length

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-outline-variant/10">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-background tracking-tighter">Applicants</h2>
          <div className="flex gap-10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold opacity-60">Pending Review</span>
              <span className="text-2xl font-headline font-bold text-primary">{pendingCount}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold opacity-60">Total Active</span>
              <span className="text-2xl font-headline font-bold text-on-background">{displayApplicants.length}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {/* Desktop Header */}
        <div className="hidden lg:grid grid-cols-[1fr_200px_150px_150px_100px] gap-8 px-10 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-outline opacity-60">
          <div>Applicant</div>
          <div>Property</div>
          <div>Income</div>
          <div>Status</div>
          <div className="text-right">Action</div>
        </div>

        <div className="space-y-4">
          {displayApplicants.map((app: any, index: number) => {
            const profile = app.profiles || {}
            const property = app.properties || {}
            const personalInfo = app.personal_info || {}
            const vettingProgress = app.vetting_progress || (app.status === 'approved' ? 100 : app.status === 'pending' ? 45 : 10)
            
            return (
              <div 
                key={app.id}
                className="group bg-surface-container-lowest lg:bg-transparent border border-outline-variant/10 lg:border-none rounded-[2rem] lg:rounded-none overflow-hidden hover:bg-surface-container-low transition-all"
              >
                <div className="lg:grid lg:grid-cols-[1fr_200px_150px_150px_100px] gap-8 px-6 py-6 lg:px-10 lg:py-8 items-center lg:border-b lg:border-outline-variant/10">
                  {/* Name & ID */}
                  <div className="flex items-center gap-4 mb-6 lg:mb-0">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-sm">
                      {profile.first_name?.[0]}{profile.last_name?.[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-headline font-bold text-on-background tracking-tight">
                        {profile.first_name} {profile.last_name}
                      </h3>
                      <p className="text-[10px] text-outline font-bold uppercase tracking-widest opacity-60">ID: {app.id.slice(0, 8)}</p>
                    </div>
                  </div>

                  {/* Property */}
                  <div className="mb-6 lg:mb-0">
                    <p className="text-sm font-medium text-on-surface truncate max-w-[200px]">{property.address || 'General Interest'}</p>
                    <p className="text-[10px] text-outline font-bold uppercase tracking-widest opacity-60">{property.city || 'Any'}</p>
                  </div>

                  {/* Income - Mobile Row */}
                  <div className="flex lg:block items-center justify-between mb-4 lg:mb-0 pt-4 lg:pt-0 border-t lg:border-none border-outline-variant/5">
                    <span className="lg:hidden text-[9px] uppercase tracking-widest text-outline font-bold">Income</span>
                    <span className="text-sm font-bold text-on-surface">
                      {personalInfo.income ? `$${Number(personalInfo.income).toLocaleString()}/yr` : 'N/A'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="mb-8 lg:mb-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        app.status === 'approved' ? 'bg-green-500' : 
                        app.status === 'rejected' ? 'bg-red-500' : 
                        'bg-primary'
                      }`} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface">
                        {app.status}
                      </span>
                    </div>
                    <div className="mt-2 h-1 w-24 bg-surface-container-high rounded-full overflow-hidden hidden lg:block">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          app.status === 'approved' ? 'bg-green-500' : 
                          app.status === 'rejected' ? 'bg-red-500' : 
                          'bg-primary'
                        }`}
                        style={{ width: `${app.status === 'rejected' ? 100 : vettingProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="text-left lg:text-right">
                    <Link 
                      href={`/admin/applicants/${app.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-on-background transition-colors no-underline group/link"
                    >
                      Review
                      <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
