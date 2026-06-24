import { Suspense } from 'react'
import LeadForm from '@/components/LeadForm'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-savannah-green text-white">
        {/* SVG savannah landscape background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <SavannahLandscape />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center text-center gap-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-savannah-amber/20 text-savannah-sand text-xs font-semibold uppercase tracking-widest">
            Harare, Zimbabwe
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            Your Journey Across Africa, Expertly Planned
          </h1>

          <p className="text-savannah-sand/90 text-lg max-w-2xl leading-relaxed">
            From custom travel itineraries to stress-free visa appointments — Savannah Paths takes care of every detail so you can focus on the adventure.
          </p>

          <a href="#book" className="btn-primary text-base px-8 py-4 mt-2">
            Start Your Journey
          </a>
        </div>

        {/* Decorative wave */}
        <div className="relative h-16">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full" fill="#F7F2E8">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" />
          </svg>
        </div>
      </section>

      {/* Service cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-savannah-earth mt-3 max-w-xl mx-auto">
            Two focused services, transparent pricing — no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard
            icon={<MapIcon />}
            price="$20"
            title="Itinerary Consultation"
            description="Work with our expert consultants to build a custom day-by-day travel plan. Hotels, activities, transport connections, budget breakdown — everything mapped out before you leave."
            features={['Custom day-by-day itinerary', 'Hotel & transport recommendations', 'Budget breakdown', 'Unlimited revisions (7 days)']}
            cta="Book a Consult"
            href="#book"
          />
          <ServiceCard
            icon={<PassportIcon />}
            price="$50"
            title="Visa Appointment Booking"
            description="Skip the confusion of embassy systems. We book your visa appointment, prepare your checklist, and guide you through every requirement for your destination country."
            features={['Appointment slot secured', 'Document checklist provided', 'Embassy system navigation', 'Follow-up support until appointment']}
            cta="Book Visa Help"
            href="#book"
            highlighted
          />
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-savannah-earth/10 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-8 text-center">
          {[
            { stat: '500+', label: 'Travellers Helped' },
            { stat: '30+', label: 'Countries Covered' },
            { stat: '24h', label: 'Response Time' },
            { stat: '100%', label: 'WhatsApp Support' },
          ].map(({ stat, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 min-w-[120px]">
              <span className="text-3xl font-bold text-savannah-amber">{stat}</span>
              <span className="text-sm text-savannah-earth">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section id="book" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="section-title">Get Started Today</h2>
          <p className="text-savannah-earth mt-3 max-w-lg mx-auto">
            Tell us where you want to go. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <Suspense>
          <LeadForm />
        </Suspense>
      </section>
    </>
  )
}

/* ── Sub-components ── */

interface ServiceCardProps {
  icon: React.ReactNode
  price: string
  title: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
}

function ServiceCard({ icon, price, title, description, features, cta, href, highlighted }: ServiceCardProps) {
  return (
    <div className={`rounded-2xl p-8 flex flex-col gap-5 border transition-shadow hover:shadow-lg ${
      highlighted
        ? 'bg-savannah-green text-white border-savannah-green'
        : 'bg-white text-savannah-dusk border-savannah-sand/30'
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlighted ? 'bg-white/10' : 'bg-savannah-amber/10'}`}>
        {icon}
      </div>

      <div>
        <div className={`text-2xl font-bold mb-1 ${highlighted ? 'text-savannah-sand' : 'text-savannah-amber'}`}>{price}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${highlighted ? 'text-white/80' : 'text-savannah-earth'}`}>{description}</p>
      </div>

      <ul className="space-y-2 flex-1">
        {features.map(f => (
          <li key={f} className={`flex items-start gap-2 text-sm ${highlighted ? 'text-white/90' : 'text-savannah-dusk'}`}>
            <span className={`mt-0.5 flex-shrink-0 ${highlighted ? 'text-savannah-sand' : 'text-savannah-amber'}`}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={href}
        className={highlighted
          ? 'btn-primary text-center'
          : 'btn-secondary text-center'
        }
      >
        {cta}
      </a>
    </div>
  )
}

function MapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4891F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  )
}

function PassportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F7F2E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
    </svg>
  )
}

function SavannahLandscape() {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Ground */}
      <ellipse cx="720" cy="420" rx="900" ry="120" fill="#4A7C2A" />
      {/* Acacia trees */}
      <g>
        {/* Tree 1 */}
        <rect x="200" y="280" width="8" height="80" fill="#5C3D2E" />
        <ellipse cx="204" cy="265" rx="45" ry="25" fill="#2D5016" />
        {/* Tree 2 */}
        <rect x="1100" y="250" width="10" height="110" fill="#5C3D2E" />
        <ellipse cx="1105" cy="232" rx="60" ry="30" fill="#2D5016" />
        {/* Tree 3 */}
        <rect x="650" y="290" width="7" height="70" fill="#5C3D2E" />
        <ellipse cx="653" cy="278" rx="35" ry="18" fill="#2D5016" />
      </g>
      {/* Sun */}
      <circle cx="1300" cy="80" r="60" fill="#D4891F" opacity="0.6" />
      {/* Mountains */}
      <path d="M0 320 L200 150 L400 280 L600 100 L800 260 L1000 120 L1200 280 L1440 140 L1440 400 L0 400 Z" fill="#2D5016" opacity="0.3" />
    </svg>
  )
}
