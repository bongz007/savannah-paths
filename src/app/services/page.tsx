import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services — Savannah Paths',
  description: 'Itinerary consultation ($20) and visa appointment booking ($50) from Harare, Zimbabwe.',
}

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-24">

      {/* Page header */}
      <div className="text-center space-y-4">
        <h1 className="section-title text-5xl">What We Do</h1>
        <p className="text-savannah-earth max-w-xl mx-auto text-lg">
          Two services. Transparent prices. No jargon. Just expert travel support from people who know Africa.
        </p>
      </div>

      {/* Itinerary Consult */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-savannah-amber/10 text-savannah-amber text-sm font-semibold">
            <MapSVG /> Service 01
          </div>
          <h2 className="font-display text-3xl font-bold text-savannah-green">Itinerary Consultation</h2>
          <div className="text-4xl font-bold text-savannah-amber">$20 <span className="text-base font-normal text-savannah-earth">/ consultation</span></div>
          <p className="text-savannah-earth leading-relaxed">
            Planning a trip without a clear itinerary is stressful. Our consultants build a practical, personalised day-by-day plan — covering where to stay, how to get there, what to do, and how much to budget. You leave with a document you can hand to anyone.
          </p>
          <ul className="space-y-3">
            {[
              'Personalised day-by-day schedule',
              'Recommended hotels across budget levels',
              'Ground transport & connection options',
              'Activity suggestions with costs',
              'Total trip budget breakdown',
              'Unlimited revisions within 7 days of delivery',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-savannah-dusk">
                <CheckCircle />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/book" className="btn-primary inline-flex">Book Itinerary Consult — $20</Link>
        </div>
        <div className="flex justify-center">
          <ItineraryIllustration />
        </div>
      </section>

      <hr className="border-savannah-sand/30" />

      {/* Visa Appointment */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <VisaIllustration />
        </div>
        <div className="order-1 md:order-2 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-savannah-green/10 text-savannah-green text-sm font-semibold">
            <PassportSVG /> Service 02
          </div>
          <h2 className="font-display text-3xl font-bold text-savannah-green">Visa Appointment Booking</h2>
          <div className="text-4xl font-bold text-savannah-amber">$50 <span className="text-base font-normal text-savannah-earth">/ booking</span></div>
          <p className="text-savannah-earth leading-relaxed">
            Embassy booking portals are notoriously confusing — wrong slot types, conflicting requirements, and slots that disappear in seconds. We navigate these systems daily. Tell us your destination and travel dates and we&apos;ll secure your appointment slot and send you a clear checklist.
          </p>
          <ul className="space-y-3">
            {[
              'Appointment slot secured on your behalf',
              'Country-specific document checklist',
              'Guidance on form completion',
              'Fee payment instructions',
              'WhatsApp support until your appointment date',
              'Works for UK, Schengen, UAE, US, SA & more',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-savannah-dusk">
                <CheckCircle />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/book" className="btn-primary inline-flex">Book Visa Appointment Help — $50</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="section-title text-2xl">Common Questions</h2>
        <div className="space-y-5">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-savannah-sand/30 pb-5 last:border-0">
              <h3 className="font-semibold text-savannah-green mb-1">{q}</h3>
              <p className="text-sm text-savannah-earth leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4 bg-savannah-green rounded-2xl p-12 text-white">
        <h2 className="font-display text-3xl font-bold">Ready to start planning?</h2>
        <p className="text-savannah-sand/90 max-w-md mx-auto">Submit your request and we&apos;ll respond within 24 hours.</p>
        <Link href="/book" className="btn-primary text-base px-8 py-4">Get Started</Link>
      </section>
    </div>
  )
}

const FAQS = [
  {
    q: 'When do I pay?',
    a: "We'll confirm availability and agree on scope before requesting payment. We use EcoCash, ZIPIT, or USD cash in Harare.",
  },
  {
    q: 'How quickly will I receive my itinerary?',
    a: 'Standard delivery is 48 hours after consultation. Urgent requests (24h) are available at the same price.',
  },
  {
    q: 'Do you help with countries beyond Africa?',
    a: 'Yes. We handle itineraries and visa appointments for any destination: UK, Schengen zone, UAE, USA, Canada, China, and more.',
  },
  {
    q: 'What if my visa appointment gets cancelled?',
    a: "We re-book at no extra charge if the cancellation is on the embassy's side. Our support continues until you have a confirmed appointment.",
  },
  {
    q: 'Can I get both services together?',
    a: 'Yes — select "Both Services" when booking and we\'ll bundle them at $70 total.',
  },
]

function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5" stroke="#4A7C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function MapSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  )
}

function PassportSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  )
}

function ItineraryIllustration() {
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true">
      <rect width="280" height="280" rx="20" fill="#F7F2E8" />
      {/* Map background */}
      <rect x="20" y="20" width="240" height="180" rx="12" fill="#E8F4E8" />
      {/* Route line */}
      <path d="M50 150 Q80 80 120 100 Q160 120 180 70 Q210 30 240 50" stroke="#D4891F" strokeWidth="3" fill="none" strokeDasharray="6 4" />
      {/* Pins */}
      <circle cx="50" cy="150" r="8" fill="#2D5016" />
      <circle cx="120" cy="100" r="8" fill="#D4891F" />
      <circle cx="240" cy="50" r="8" fill="#2D5016" />
      {/* Labels */}
      <rect x="28" y="220" width="220" height="40" rx="8" fill="white" />
      <rect x="36" y="228" width="80" height="8" rx="4" fill="#C9A96E" />
      <rect x="36" y="242" width="120" height="6" rx="3" fill="#E8E0D0" />
      <rect x="164" y="228" width="40" height="16" rx="4" fill="#D4891F" />
    </svg>
  )
}

function VisaIllustration() {
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true">
      <rect width="280" height="280" rx="20" fill="#F7F2E8" />
      {/* Passport */}
      <rect x="60" y="40" width="160" height="200" rx="12" fill="#2D5016" />
      <rect x="75" y="55" width="130" height="170" rx="8" fill="#3D6B20" />
      {/* Photo area */}
      <rect x="90" y="75" width="55" height="65" rx="6" fill="#F7F2E8" />
      <circle cx="117" cy="100" r="18" fill="#C9A96E" />
      <path d="M90 138 Q117 125 145 138" fill="#C9A96E" />
      {/* Lines */}
      <rect x="155" y="80" width="40" height="6" rx="3" fill="#4A7C2A" />
      <rect x="155" y="94" width="35" height="6" rx="3" fill="#4A7C2A" />
      <rect x="155" y="108" width="30" height="6" rx="3" fill="#4A7C2A" />
      {/* Stamp */}
      <circle cx="185" cy="175" r="30" stroke="#D4891F" strokeWidth="3" fill="none" />
      <text x="185" y="172" textAnchor="middle" fill="#D4891F" fontSize="10" fontWeight="bold">VISA</text>
      <text x="185" y="185" textAnchor="middle" fill="#D4891F" fontSize="8">APPROVED</text>
    </svg>
  )
}
