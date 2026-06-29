'use client'

import { useState } from 'react'

const WA_NUMBER = '263789977673'

const SERVICES = [
  {
    id: 'itinerary',
    label: 'Itinerary Consultation',
    price: '$30',
    emoji: '🗺️',
    description: 'Custom day-by-day travel plan',
    message: (destination: string, month: string) =>
      `Hi Savannah Paths! 👋 I'd like an Itinerary Consultation ($30).${destination ? `\n📍 Destination: ${destination}` : ''}${month ? `\n📅 Travel month: ${month}` : ''}\n\nPlease get back to me when you're available.`,
  },
  {
    id: 'visa',
    label: 'Visa Consultation',
    price: '$150',
    emoji: '📋',
    description: 'Visa appointment booking & guidance',
    message: (destination: string, month: string) =>
      `Hi Savannah Paths! 👋 I need a Visa Consultation ($150).${destination ? `\n📍 Country: ${destination}` : ''}${month ? `\n📅 Travel month: ${month}` : ''}\n\nPlease get back to me when you're available.`,
  },
  {
    id: 'both',
    label: 'Both Services',
    price: '$180',
    emoji: '✈️',
    description: 'Itinerary + Visa consultation bundle',
    message: (destination: string, month: string) =>
      `Hi Savannah Paths! 👋 I'd like both the Itinerary Consultation & Visa Consultation ($180 bundle).${destination ? `\n📍 Destination: ${destination}` : ''}${month ? `\n📅 Travel month: ${month}` : ''}\n\nPlease get back to me when you're available.`,
  },
]

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

export default function WhatsAppBooking() {
  const [selected,    setSelected]    = useState<string | null>(null)
  const [destination, setDestination] = useState('')
  const [month,       setMonth]       = useState('')

  const service = SERVICES.find(s => s.id === selected)

  const waLink = service
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(service.message(destination, month))}`
    : `https://wa.me/${WA_NUMBER}`

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Step 1 — pick service */}
      <div>
        <p className="text-sm font-semibold text-savannah-earth uppercase tracking-wide mb-3">
          1. Choose your service
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SERVICES.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                selected === s.id
                  ? 'border-savannah-amber bg-savannah-amber/5 shadow-md'
                  : 'border-savannah-sand/40 bg-white hover:border-savannah-amber/50'
              }`}
            >
              <div className="text-2xl mb-2">{s.emoji}</div>
              <div className="font-semibold text-savannah-green text-sm">{s.label}</div>
              <div className="text-savannah-amber font-bold text-lg">{s.price}</div>
              <div className="text-xs text-savannah-earth mt-1">{s.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — optional details */}
      <div className={`space-y-3 transition-opacity duration-200 ${selected ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <p className="text-sm font-semibold text-savannah-earth uppercase tracking-wide">
          2. Add details <span className="font-normal normal-case text-savannah-earth/60">(optional — you can share these on WhatsApp too)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="destination">Destination country</label>
            <input
              id="destination"
              className="input-field"
              placeholder="e.g. South Africa, UAE, UK"
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="month">Travel month</label>
            <select
              id="month"
              className="input-field"
              value={month}
              onChange={e => setMonth(e.target.value)}
            >
              <option value="">Select month…</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Step 3 — open WhatsApp */}
      <div>
        <p className="text-sm font-semibold text-savannah-earth uppercase tracking-wide mb-3">
          3. Open WhatsApp — we reply within the hour
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-whatsapp w-full text-base py-4 justify-center transition-all ${
            !selected ? 'opacity-50 pointer-events-none' : 'shadow-lg hover:shadow-xl'
          }`}
        >
          <WhatsAppIcon />
          {selected ? `Chat about ${service!.label}` : 'Select a service above'}
        </a>
        <p className="text-xs text-center text-savannah-earth/60 mt-3">
          Opens WhatsApp with a pre-filled message. No forms, no waiting — just a direct conversation.
        </p>
      </div>

      {/* Direct contact strip */}
      <div className="flex flex-wrap justify-center gap-6 pt-2 border-t border-savannah-sand/30">
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-savannah-green hover:text-savannah-green-light transition-colors font-medium"
        >
          <WhatsAppIcon size={16} /> +263 78 997 7673
        </a>
        <a
          href="mailto:savannahpaths@gmail.com"
          className="flex items-center gap-2 text-sm text-savannah-earth hover:text-savannah-dusk transition-colors"
        >
          <EmailIcon /> savannahpaths@gmail.com
        </a>
      </div>
    </div>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
