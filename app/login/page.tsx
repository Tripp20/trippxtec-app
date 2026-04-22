'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Admin shortcut
    if (email === 'admin@trippxtec.com') {
      router.push('/admin')
      return
    }

    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/admin` } })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  if (sent) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📧</div>
        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        <p className="mt-3 text-gray-500">We sent a login link to <strong>{email}</strong>. Click it to sign in.</p>
        <Link href="/" className="mt-8 inline-block text-blue-700 text-sm hover:underline">← Back to home</Link>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-blue-700">TrippXTec</Link>
          <p className="mt-2 text-gray-500 text-sm">Admin & Expert Login</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Login Link'}
          </button>

          <p className="text-center text-xs text-gray-400">We will send a magic link to your email. No password needed.</p>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Need help? <a href="https://wa.me/234" className="text-blue-700 hover:underline">WhatsApp us</a>
        </p>
      </div>
    </main>
  )
}
