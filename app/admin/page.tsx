'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Session = { id: string; customer_name: string; customer_whatsapp: string; problem_title: string; category: string; tier: string; status: string; created_at: string; problem_description: string }
type Application = { id: string; name: string; whatsapp: string; skills: string[]; experience_years: string; availability: string; status: string; created_at: string }

const tierPrice: Record<string, string> = { quick: '₦3,500', pro: '₦8,000', business: '₦15,000' }
const statusColor: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-800', matched: 'bg-blue-100 text-blue-800', in_progress: 'bg-purple-100 text-purple-800', resolved: 'bg-green-100 text-green-800', pending_review: 'bg-yellow-100 text-yellow-800', approved: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800' }

export default function AdminPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [tab, setTab] = useState<'sessions' | 'experts'>('sessions')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: s }, { data: a }] = await Promise.all([
        supabase.from('sessions').select('*').order('created_at', { ascending: false }),
        supabase.from('expert_applications').select('*').order('created_at', { ascending: false }),
      ])
      setSessions(s || [])
      setApplications(a || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const updateSessionStatus = async (id: string, status: string) => {
    await supabase.from('sessions').update({ status }).eq('id', id)
    setSessions(s => s.map(x => x.id === id ? { ...x, status } : x))
  }

  const updateApplicationStatus = async (id: string, status: string) => {
    await supabase.from('expert_applications').update({ status }).eq('id', id)
    setApplications(a => a.map(x => x.id === id ? { ...x, status } : x))
  }

  const stats = {
    pending: sessions.filter(s => s.status === 'pending').length,
    resolved: sessions.filter(s => s.status === 'resolved').length,
    total: sessions.length,
    experts: applications.filter(a => a.status === 'pending_review').length,
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="text-2xl font-bold text-blue-700">TrippXTec Admin</span>
        <span className="text-sm text-gray-400">Dashboard</span>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Pending Sessions', value: stats.pending, color: 'text-yellow-600' },
            { label: 'Resolved Sessions', value: stats.resolved, color: 'text-green-600' },
            { label: 'Total Sessions', value: stats.total, color: 'text-blue-600' },
            { label: 'Expert Applications', value: stats.experts, color: 'text-purple-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('sessions')} className={`px-5 py-2 rounded-lg font-medium text-sm transition ${tab === 'sessions' ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Customer Sessions</button>
          <button onClick={() => setTab('experts')} className={`px-5 py-2 rounded-lg font-medium text-sm transition ${tab === 'experts' ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Expert Applications</button>
        </div>

        {loading && <p className="text-gray-400 text-center py-12">Loading...</p>}

        {/* Sessions */}
        {!loading && tab === 'sessions' && (
          <div className="space-y-4">
            {sessions.length === 0 && <div className="bg-white rounded-xl p-12 text-center text-gray-400">No sessions yet. Share the platform link to start getting customers.</div>}
            {sessions.map(s => (
              <div key={s.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-bold text-gray-900">{s.problem_title}</p>
                    <p className="text-sm text-gray-500 mt-1">{s.customer_name} · {s.customer_whatsapp} · {s.category}</p>
                    <p className="text-sm text-gray-400 mt-1">{s.problem_description?.slice(0, 120)}...</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-blue-700">{tierPrice[s.tier] || s.tier}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[s.status] || 'bg-gray-100 text-gray-600'}`}>{s.status}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {['pending', 'matched', 'in_progress', 'resolved'].map(st => (
                    <button key={st} onClick={() => updateSessionStatus(s.id, st)} className={`text-xs px-3 py-1.5 rounded-lg border transition ${s.status === st ? 'bg-blue-700 text-white border-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-400'}`}>
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                  <a href={`https://wa.me/${s.customer_whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg border border-green-400 text-green-600 hover:bg-green-50 transition">
                    WhatsApp Customer
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expert Applications */}
        {!loading && tab === 'experts' && (
          <div className="space-y-4">
            {applications.length === 0 && <div className="bg-white rounded-xl p-12 text-center text-gray-400">No expert applications yet.</div>}
            {applications.map(a => (
              <div key={a.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-bold text-gray-900">{a.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{a.whatsapp} · {a.experience_years} yrs exp · {a.availability}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(a.skills || []).map((sk: string) => <span key={sk} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{sk}</span>)}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[a.status] || 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button onClick={() => updateApplicationStatus(a.id, 'approved')} className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">Approve</button>
                  <button onClick={() => updateApplicationStatus(a.id, 'rejected')} className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Reject</button>
                  <a href={`https://wa.me/${a.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg border border-green-400 text-green-600 hover:bg-green-50 transition">
                    WhatsApp Expert
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
