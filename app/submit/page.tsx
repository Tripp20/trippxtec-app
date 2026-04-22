'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const categories = ['Laptop / PC Issue', 'Software / App Problem', 'Website Issue', 'Network / Internet', 'Data Recovery', 'Email Setup', 'Server Issue', 'Phone / Mobile', 'Other']
const tiers = [
  { id: 'quick', label: 'Quick Fix', price: '₦3,500', desc: 'Single issue, within 2 hours' },
  { id: 'pro', label: 'Pro Fix', price: '₦8,000', desc: 'Complex issue, up to 3 hours' },
  { id: 'business', label: 'Business Fix', price: '₦15,000', desc: 'Business-critical, same day' },
]

export default function SubmitPage() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', title: '', description: '', category: '', tier: 'pro' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.from('sessions').insert([{
      customer_name: form.name,
      customer_email: form.email,
      customer_whatsapp: form.whatsapp,
      problem_title: form.title,
      problem_description: form.description,
      category: form.category,
      tier: form.tier,
      status: 'pending',
    }])
    setLoading(false)
    if (error) { setError('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Problem Submitted!</h1>
        <p className="mt-3 text-gray-500">We will match you to the right expert and reach out on WhatsApp within 30 minutes during business hours.</p>
        <p className="mt-2 text-gray-500 text-sm">You only pay after your problem is resolved.</p>
        <Link href="/" className="mt-8 inline-block bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition">Back to Home</Link>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-bold text-blue-700">TrippXTec</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900">Submit Your Problem</h1>
        <p className="mt-2 text-gray-500">Fill in the details below. We will match you to the right expert fast.</p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-2xl p-8 shadow-sm space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
              <input required value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+234 800 000 0000" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@email.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Problem Category *</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select a category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Problem Title *</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. My laptop keeps freezing every 10 minutes" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Describe Your Problem *</label>
            <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Give as much detail as possible — what happened, when it started, what you have already tried..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Support Tier *</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tiers.map(t => (
                <button type="button" key={t.id} onClick={() => setForm({...form, tier: t.id})} className={`p-4 rounded-xl border-2 text-left transition ${form.tier === t.id ? 'border-blue-700 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <p className="font-bold text-sm text-gray-900">{t.label}</p>
                  <p className="text-blue-700 font-extrabold text-lg">{t.price}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Problem →'}
          </button>

          <p className="text-center text-xs text-gray-400">You only pay after your problem is fully resolved. No upfront payment required.</p>
        </form>
      </div>
    </main>
  )
}
