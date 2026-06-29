'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const SERVICES = ['Itinerary Consult ($30)', 'Visa Consultation ($150)', 'Both Services']
const SOURCES  = ['Facebook Ad', 'WhatsApp Group', 'Referral', 'Walk-in', 'Other']

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

interface Props {
  compact?: boolean
}

export default function LeadForm({ compact = false }: Props) {
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    service: '',
    destination: '',
    travel_month: '',
    source: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<{ name: string; service: string; destination: string } | null>(null)
  const [error, setError]   = useState<string | null>(null)

  const utmParams = {
    utm_source:   searchParams.get('utm_source')   ?? '',
    utm_medium:   searchParams.get('utm_medium')   ?? '',
    utm_campaign: searchParams.get('utm_campaign') ?? '',
  }

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.phone || !form.service) {
      setError('Please fill in your name, phone number, and the service you need.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...utmParams }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setSuccess({
        name:        form.full_name,
        service:     form.service,
        destination: form.destination,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '263789977673'
    const waText   = encodeURIComponent(
      `Hi Savannah Paths, I'm ${success.name} and I'm interested in ${success.service}${success.destination ? ` to ${success.destination}` : ''}.`
    )
    const waLink = `https://wa.me/${waNumber}?text=${waText}`

    return (
      <div className="card text-center py-10">
        <div className="w-16 h-16 rounded-full bg-savannah-green/10 flex items-center justify-center mx-auto mb-4">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-bold text-savannah-green mb-2">Request Received!</h3>
        <p className="text-sm text-savannah-earth mb-6">
          Thanks, <span className="font-semibold">{success.name}</span>! We&apos;ll be in touch shortly.
          Check your email for a confirmation.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <WhatsAppIcon />
          Chat with us now on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`card space-y-4 ${compact ? '' : 'max-w-2xl mx-auto'}`}>
      {!compact && (
        <div className="mb-2">
          <h2 className="section-title text-2xl">Start Your Journey</h2>
          <p className="text-sm text-savannah-earth mt-1">Fill in your details and we&apos;ll reach out within 24 hours.</p>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label className="label" htmlFor="full_name">Full Name *</label>
          <input
            id="full_name"
            className="input-field"
            placeholder="Jane Moyo"
            value={form.full_name}
            onChange={e => set('full_name', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="phone">Phone (WhatsApp preferred) *</label>
          <input
            id="phone"
            type="tel"
            className="input-field"
            placeholder="+263 77 123 4567"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="jane@example.com"
            value={form.email}
            onChange={e => set('email', e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="service">Service Interested In *</label>
          <select
            id="service"
            className="input-field"
            value={form.service}
            onChange={e => set('service', e.target.value)}
            required
          >
            <option value="" disabled>Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="destination">Destination Country</label>
          <input
            id="destination"
            className="input-field"
            placeholder="e.g. South Africa, UAE, UK"
            value={form.destination}
            onChange={e => set('destination', e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="travel_month">Travel Month</label>
          <select
            id="travel_month"
            className="input-field"
            value={form.travel_month}
            onChange={e => set('travel_month', e.target.value)}
          >
            <option value="">Select month…</option>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className="label" htmlFor="source">How did you hear about us?</label>
          <select
            id="source"
            className="input-field"
            value={form.source}
            onChange={e => set('source', e.target.value)}
          >
            <option value="">Select…</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : 'Send My Request'}
      </button>

      <p className="text-xs text-center text-savannah-earth/70">
        No commitment required. We&apos;ll confirm availability before any payment.
      </p>
    </form>
  )
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
