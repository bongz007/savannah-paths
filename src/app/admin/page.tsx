'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'
import type { Lead, LeadStatus } from '@/types/lead'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell,
} from 'recharts'

const STATUS_PIPELINE: LeadStatus[] = ['new', 'contacted', 'qualified', 'booked', 'lost']

const STATUS_COLORS: Record<LeadStatus, string> = {
  new:       'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-orange-100 text-orange-800',
  booked:    'bg-green-100 text-green-800',
  lost:      'bg-red-100 text-red-800',
}

type SortKey = 'created_at' | 'status' | 'source'
type SortDir = 'asc' | 'desc'

export default function AdminDashboard() {
  const router = useRouter()
  const [leads,       setLeads]       = useState<Lead[]>([])
  const [loading,     setLoading]     = useState(true)
  const [token,       setToken]       = useState<string | null>(null)
  const [sortKey,     setSortKey]     = useState<SortKey>('created_at')
  const [sortDir,     setSortDir]     = useState<SortDir>('desc')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Guard: check auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login'); return }
      setToken(session.access_token)
    })
  }, [router])

  const fetchLeads = useCallback(async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order(sortKey, { ascending: sortDir === 'asc' })

    if (error) { console.error(error); return }
    setLeads(data as Lead[])
    setLoading(false)
  }, [sortKey, sortDir])

  useEffect(() => {
    if (token) fetchLeads()
  }, [token, fetchLeads])

  async function updateStatus(id: string, status: LeadStatus) {
    if (!token) return
    const res = await fetch('/api/leads/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setLeads(leads => leads.map(l => l.id === id ? { ...l, status } : l))
    }
  }

  async function handleExport() {
    if (!token) return
    const res = await fetch('/api/leads/export', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `savannah-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const toggle = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const filtered = statusFilter === 'all'
    ? leads
    : leads.filter(l => l.status === statusFilter)

  // Chart data: lead count by source
  const sourceMap: Record<string, number> = {}
  leads.forEach(l => {
    const s = l.source || 'Unknown'
    sourceMap[s] = (sourceMap[s] || 0) + 1
  })
  const sourceData = Object.entries(sourceMap).map(([name, count]) => ({ name, count }))

  // UTM breakdown
  const utmMap: Record<string, { leads: number; booked: number }> = {}
  leads.forEach(l => {
    const key = [l.utm_source, l.utm_campaign].filter(Boolean).join(' / ') || 'Organic'
    if (!utmMap[key]) utmMap[key] = { leads: 0, booked: 0 }
    utmMap[key].leads++
    if (l.status === 'booked') utmMap[key].booked++
  })
  const utmData = Object.entries(utmMap).map(([key, v]) => ({
    key,
    leads:  v.leads,
    booked: v.booked,
    rate:   v.leads > 0 ? Math.round((v.booked / v.leads) * 100) : 0,
  }))

  // Pipeline counts
  const pipelineCounts = STATUS_PIPELINE.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length
    return acc
  }, {} as Record<LeadStatus, number>)

  if (loading) {
    return (
      <div className="min-h-screen bg-savannah-cream flex items-center justify-center">
        <div className="text-savannah-earth animate-pulse">Loading dashboard…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-savannah-cream">
      {/* Admin header */}
      <header className="bg-savannah-green text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">Savannah Paths — Admin</h1>
          <p className="text-savannah-sand/80 text-xs">{leads.length} total leads</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="text-sm bg-savannah-amber hover:bg-savannah-amber-dark text-white px-4 py-2 rounded-lg transition-colors">
            Export CSV
          </button>
          <button onClick={handleLogout} className="text-sm border border-savannah-sand/40 text-savannah-sand px-4 py-2 rounded-lg hover:bg-savannah-green-light transition-colors">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Pipeline summary */}
        <div className="grid grid-cols-5 gap-3">
          {STATUS_PIPELINE.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={`card text-center py-4 transition-all hover:shadow-md cursor-pointer ${statusFilter === s ? 'ring-2 ring-savannah-amber' : ''}`}
            >
              <div className="text-2xl font-bold text-savannah-green">{pipelineCounts[s]}</div>
              <div className="text-xs capitalize text-savannah-earth mt-1">{s}</div>
            </button>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source bar chart */}
          <div className="card">
            <h2 className="font-bold text-savannah-green mb-4">Leads by Source</h2>
            {sourceData.length === 0 ? (
              <p className="text-sm text-savannah-earth text-center py-8">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sourceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5C3D2E' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#5C3D2E' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #C9A96E' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {sourceData.map((_, i) => (
                      <Cell key={i} fill={['#D4891F', '#2D5016', '#8B5E3C', '#4A7C2A', '#C9A96E'][i % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* UTM breakdown table */}
          <div className="card">
            <h2 className="font-bold text-savannah-green mb-4">UTM / Ad Campaign Breakdown</h2>
            {utmData.length === 0 ? (
              <p className="text-sm text-savannah-earth text-center py-8">No UTM data yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-savannah-earth uppercase tracking-wide border-b border-savannah-sand/30">
                      <th className="pb-2 pr-3">Source / Campaign</th>
                      <th className="pb-2 pr-3 text-right">Leads</th>
                      <th className="pb-2 pr-3 text-right">Booked</th>
                      <th className="pb-2 text-right">Conv. %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-savannah-sand/20">
                    {utmData.map(row => (
                      <tr key={row.key} className="hover:bg-savannah-cream/50">
                        <td className="py-2 pr-3 font-medium text-savannah-dusk">{row.key}</td>
                        <td className="py-2 pr-3 text-right text-savannah-earth">{row.leads}</td>
                        <td className="py-2 pr-3 text-right text-savannah-green font-semibold">{row.booked}</td>
                        <td className="py-2 text-right">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${row.rate >= 20 ? 'bg-green-100 text-green-800' : row.rate > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                            {row.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Leads table */}
        <div className="card overflow-hidden p-0">
          <div className="px-6 py-4 border-b border-savannah-sand/30 flex items-center justify-between">
            <h2 className="font-bold text-savannah-green">
              {statusFilter === 'all' ? 'All Leads' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Leads`}
              <span className="ml-2 text-sm font-normal text-savannah-earth">({filtered.length})</span>
            </h2>
            {statusFilter !== 'all' && (
              <button onClick={() => setStatusFilter('all')} className="text-xs text-savannah-amber hover:underline">
                Clear filter
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-savannah-cream">
                <tr className="text-left text-xs text-savannah-earth uppercase tracking-wide">
                  <Th onClick={() => toggle('created_at')} active={sortKey === 'created_at'} dir={sortDir}>Date</Th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Month</th>
                  <Th onClick={() => toggle('source')} active={sortKey === 'source'} dir={sortDir}>Source</Th>
                  <th className="px-4 py-3">UTM</th>
                  <Th onClick={() => toggle('status')} active={sortKey === 'status'} dir={sortDir}>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-savannah-sand/20">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-savannah-earth">
                      No leads yet. Submit a test form to see data here.
                    </td>
                  </tr>
                )}
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-savannah-cream/40 transition-colors">
                    <td className="px-4 py-3 text-savannah-earth whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-ZW', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 font-medium text-savannah-dusk whitespace-nowrap">{lead.full_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${lead.full_name}, this is Savannah Paths regarding your request.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-savannah-green hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-savannah-earth">{lead.email || '—'}</td>
                    <td className="px-4 py-3 text-savannah-dusk">{lead.service}</td>
                    <td className="px-4 py-3 text-savannah-earth">{lead.destination || '—'}</td>
                    <td className="px-4 py-3 text-savannah-earth">{lead.travel_month || '—'}</td>
                    <td className="px-4 py-3 text-savannah-earth">{lead.source || '—'}</td>
                    <td className="px-4 py-3 text-xs text-savannah-earth/70">
                      {[lead.utm_source, lead.utm_campaign].filter(Boolean).join(' / ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusSelect lead={lead} onUpdate={updateStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function Th({ children, onClick, active, dir }: {
  children: React.ReactNode; onClick: () => void; active: boolean; dir: SortDir
}) {
  return (
    <th
      className="px-4 py-3 cursor-pointer select-none hover:text-savannah-green transition-colors"
      onClick={onClick}
    >
      <span className="flex items-center gap-1">
        {children}
        {active && <span className="text-savannah-amber">{dir === 'desc' ? '↓' : '↑'}</span>}
      </span>
    </th>
  )
}

function StatusSelect({ lead, onUpdate }: {
  lead: Lead; onUpdate: (id: string, status: LeadStatus) => Promise<void>
}) {
  const [updating, setUpdating] = useState(false)

  async function change(e: React.ChangeEvent<HTMLSelectElement>) {
    setUpdating(true)
    await onUpdate(lead.id, e.target.value as LeadStatus)
    setUpdating(false)
  }

  return (
    <select
      value={lead.status}
      onChange={change}
      disabled={updating}
      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[lead.status]} disabled:opacity-60`}
    >
      {STATUS_PIPELINE.map(s => (
        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
      ))}
    </select>
  )
}
