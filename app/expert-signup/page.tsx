'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const skillOptions = ['Windows / PC Repair', 'Mac / Apple', 'Network & WiFi', 'Web Development', 'WordPress', 'Data Recovery', 'Cybersecurity', 'Email & Google Workspace', 'Server Administration', 'Android / Mobile', 'Software Installation', 'Database Management', 'E-commerce Support', 'Cloud Services (AWS/GCP)']

export default function ExpertSignupPage() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', bio: '', skills: [] as string[], linkedin: '', experience_years: '', availability: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleSkill = (skill: string) => {
    setForm(f => ({ ...f, skills: f.skills.includes(skill) ? f.skills.filter(s => s !== skill) : [...f.skills, skill] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.skills.length === 0) { setError('Please select at least one skill.'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.from('expert_applications').insert([{
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      bio: form.bio,
      skills: form.skills,
      linkedin_url: form.linkedin,
      experience_years: parseInt(form.experience_years) || 0,
      availability: form.availability,
      status: 'pending_review',
    }])
    setLoading(false)
    if (error) { setError('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🎯</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Application Received!</h1>
        <p className="mt-3 text-gray-500">Thank you for applying to join TrippXTec. Our team will review your application and reach out on WhatsApp within 48 hours with your vetting assessment.</p>
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
        <h1 className="text-3xl font-extrabold text-gray-900">Apply as a Tech Expert</h1>
        <p className="mt-2 text-gray-500">Join Africa's most trusted tech support network. Earn well. Work remotely. Build your reputation.</p>

        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-800 font-medium">💰 Earn ₦2,450 – ₦10,500 per session. Experts doing 4 sessions/day earn ₦300,000+/month.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-2xl p-8 shadow-sm space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name" />
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
            <label className="block text-sm font-medium text-gray-700 mb-3">Your Skills * (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <button type="button" key={skill} onClick={() => toggleSkill(skill)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition ${form.skills.includes(skill) ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
              <select required value={form.experience_years} onChange={e => setForm({...form, experience_years: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Select</option>
                {['1', '2', '3', '4', '5', '6-10', '10+'].map(y => <option key={y} value={y}>{y} year{y === '1' ? '' : 's'}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
              <select required value={form.availability} onChange={e => setForm({...form, availability: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Select</option>
                <option value="fulltime">Full-time (8hrs/day)</option>
                <option value="parttime">Part-time (4hrs/day)</option>
                <option value="weekends">Weekends only</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
            <input value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://linkedin.com/in/yourprofile" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Bio *</label>
            <textarea required rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us about your technical background, what you specialise in, and why you want to join TrippXTec..." />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Application →'}
          </button>

          <p className="text-center text-xs text-gray-400">All applications are reviewed manually. You will be contacted within 48 hours.</p>
        </form>
      </div>
    </main>
  )
}
