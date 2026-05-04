'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (isSignUp) {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      } else {
        setSuccess(true)
        setLoading(false)
      }
    } else {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      } else {
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
  }

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-surface-container-lowest border border-outline-variant/10 p-10 rounded-[2.5rem] text-center"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl">mail</span>
          </div>
          <h2 className="text-2xl font-headline font-bold mb-4">Check your email</h2>
          <p className="text-on-surface-variant text-sm mb-8">
            We've sent a verification link to <span className="font-bold text-on-surface">{email}</span>. Please verify your email to continue.
          </p>
          <button 
            onClick={() => { setSuccess(false); setIsSignUp(false); }}
            className="text-primary font-bold text-sm hover:underline underline-offset-4"
          >
            Back to Sign In
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <span className="text-3xl font-bold tracking-tighter text-on-surface font-headline">Zestay</span>
          </Link>
          <h1 className="text-3xl font-headline font-bold tracking-tight mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-on-surface-variant">
            {isSignUp ? 'Join Zestay to manage your rental' : 'Enter your details to access your portal'}
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.06)]">
          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="bg-error-container text-on-error-container p-4 rounded-xl text-xs font-bold uppercase tracking-widest">
                {error}
              </div>
            )}
            
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4 overflow-hidden"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">First Name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full bg-surface-container-low rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-outline ml-1">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full bg-surface-container-low rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" 
                      placeholder="Doe" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
              {loading ? (isSignUp ? 'Creating...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Create one'}
              </button>
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
