'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      // Check if user is admin/manager to redirect correctly
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profile?.role === 'manager' || profile?.role === 'owner') {
        router.push('/admin/portfolio')
      } else {
        router.push('/tenant')
      }
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <span className="text-3xl font-bold tracking-tighter text-on-surface font-headline">Zestay</span>
          </Link>
          <h1 className="text-3xl font-headline font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-on-surface-variant">Enter your details to access your portal</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.06)]">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-error-container text-on-error-container p-4 rounded-xl text-xs font-bold uppercase tracking-widest">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" 
                placeholder="name@example.com" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-container-low rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              Don't have an account? <Link href="/tenant" className="text-primary font-bold hover:underline">Apply for a room</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-outline font-bold uppercase tracking-[0.2em] hover:text-on-surface transition-colors">
            Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
