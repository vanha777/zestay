import Link from 'next/link'
import { AdminSidebar } from '@/components/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col bg-surface overflow-x-hidden">
        {/* TopNavBar - Ultra Minimalist */}
        <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 bg-surface/60 backdrop-blur-xl z-50 border-b border-outline-variant/5">
          <div className="flex items-center gap-6">
            <h2 className="hidden lg:block text-xs font-bold uppercase tracking-[0.3em] text-outline opacity-60">Management Workspace</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xs font-bold">notifications</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-xs font-bold">account_circle</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
