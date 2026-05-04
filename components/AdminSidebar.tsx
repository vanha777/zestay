'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Portfolio', href: '/admin/portfolio', icon: 'dashboard' },
    { name: 'Applicants', href: '/admin/applicants', icon: 'person_search' },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 bg-on-background text-surface rounded-lg shadow-lg"
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-on-background/20 backdrop-blur-sm z-[55]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        h-screen w-64 fixed left-0 top-0 bg-surface flex flex-col p-8 gap-10 z-[60] 
        font-body text-sm font-medium transition-transform duration-300 ease-in-out
        border-r border-outline-variant/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined">home_repair_service</span>
          </div>
          <div>
            <h1 className="text-xl font-headline font-bold text-on-background tracking-tight">Zestay</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary opacity-80">Admin Console</p>
          </div>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/portfolio' && pathname.startsWith(item.href))
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary-container text-primary shadow-sm font-bold scale-[1.02]' 
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="tracking-tight">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="space-y-3">
          <Link 
            href="/admin/properties/add" 
            className="w-full py-4 bg-on-background text-surface rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs uppercase tracking-widest no-underline shadow-lg shadow-on-background/10"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            New Property
          </Link>
          
          <div className="pt-6 mt-6 border-t border-outline-variant/10 flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-4 px-5 py-3 text-on-surface-variant hover:text-on-surface transition-all">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="text-xs font-bold uppercase tracking-widest">Main Website</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
