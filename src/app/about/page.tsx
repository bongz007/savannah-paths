import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — Savannah Paths',
  description: 'Learn about Savannah Paths, a travel consultancy based in Harare, Zimbabwe helping travellers plan their journeys across Africa and beyond.',
}

export default function AboutPage() {
  const waNumber = process.env.WHATSAPP_NUMBER || '263789977673'
  const waText   = encodeURIComponent("Hi Savannah Paths, I'd like to learn more about your services.")
  const waLink   = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-savannah-amber/10 text-savannah-amber text-xs font-semibold uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="section-title text-4xl md:text-5xl">Rooted in Harare. Reaching the World.</h1>
          <p className="text-savannah-earth leading-relaxed text-lg">
            Savannah Paths was born from a simple frustration: great travel experiences shouldn&apos;t be buried under confusing embassy systems and generic itineraries copy-pasted from the internet.
          </p>
          <p className="text-savannah-earth leading-relaxed">
            We&apos;re a small team of passionate travellers based right here in Harare, Zimbabwe. Between us, we&apos;ve navigated visa processes for over 30 countries, built itineraries for solo backpackers and families alike, and learned exactly what makes or breaks a trip — before you even board the plane.
          </p>
          <p className="text-savannah-earth leading-relaxed">
            Our prices are honest. Our advice is practical. And we&apos;re reachable on WhatsApp — not a ticketing system — because that&apos;s how Zimbabweans do business.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex">
            <WhatsAppIcon />
            Chat with us on WhatsApp
          </a>
        </div>
        <div className="flex justify-center">
          <HarareIllustration />
        </div>
      </section>

      {/* Values */}
      <section>
        <h2 className="section-title text-center mb-10">How We Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: '🧭',
              title: 'Locally Rooted',
              body: 'We know the real cost of living in Zimbabwe. Our recommendations are priced for people transacting in USD and ZiG, not tourists spending on credit cards.',
            },
            {
              icon: '📱',
              title: 'WhatsApp-First',
              body: 'Every client gets a direct WhatsApp line. No ticket numbers, no 5-day email chains. Questions answered same day.',
            },
            {
              icon: '✅',
              title: 'No-Surprise Pricing',
              body: 'We confirm scope before requesting payment. $20 for itineraries, $50 for visa bookings — always. No hidden service fees.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="card text-center space-y-3">
              <span className="text-4xl">{icon}</span>
              <h3 className="font-bold text-savannah-green text-lg">{title}</h3>
              <p className="text-sm text-savannah-earth leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="bg-savannah-green rounded-2xl p-8 md:p-12 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Find Us in Harare</h2>
          <p className="text-savannah-sand/90 leading-relaxed">
            We operate from Harare and serve clients across Zimbabwe. Consultations happen via WhatsApp, phone, or in-person by appointment.
          </p>
          <div className="space-y-2 text-sm text-savannah-sand/80">
            <p>📍 Harare, Zimbabwe</p>
            <p>🕐 Mon–Sat, 8 AM – 6 PM CAT</p>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex mt-2">
            <WhatsAppIcon />
            Start a conversation
          </a>
        </div>
        <div className="flex justify-center">
          <ZimbabweMapSVG />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-5">
        <h2 className="section-title">Ready to travel?</h2>
        <p className="text-savannah-earth max-w-md mx-auto">Fill in our quick form and we&apos;ll reach out within 24 hours.</p>
        <Link href="/book" className="btn-primary text-base px-8 py-4">Book a Consult</Link>
      </section>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function HarareIllustration() {
  return (
    <svg width="300" height="280" viewBox="0 0 300 280" fill="none" aria-hidden="true">
      <rect width="300" height="280" rx="20" fill="#F7F2E8" />
      {/* Sky */}
      <rect width="300" height="180" rx="20" fill="#E8F4F8" />
      {/* Sun */}
      <circle cx="240" cy="55" r="35" fill="#D4891F" opacity="0.8" />
      {/* Buildings */}
      <rect x="20" y="120" width="35" height="100" fill="#C9A96E" />
      <rect x="60" y="90" width="45" height="130" fill="#8B5E3C" />
      <rect x="110" y="110" width="30" height="110" fill="#C9A96E" />
      <rect x="145" y="70" width="55" height="150" fill="#5C3D2E" />
      <rect x="205" y="100" width="40" height="120" fill="#8B5E3C" />
      <rect x="250" y="130" width="30" height="90" fill="#C9A96E" />
      {/* Windows */}
      {[25,33,25,33].map((x, i) => (
        [0,1,2,3].map(row => (
          <rect key={`${i}-${row}`} x={x} y={130 + row * 20} width="8" height="12" rx="1" fill="#F7F2E8" opacity="0.6" />
        ))
      ))}
      {/* Ground */}
      <rect x="0" y="220" width="300" height="60" rx="0" fill="#4A7C2A" />
      {/* Trees */}
      <rect x="5" y="195" width="5" height="30" fill="#5C3D2E" />
      <ellipse cx="7" cy="190" rx="12" ry="10" fill="#2D5016" />
      <rect x="285" y="200" width="5" height="25" fill="#5C3D2E" />
      <ellipse cx="287" cy="196" rx="10" ry="8" fill="#2D5016" />
    </svg>
  )
}

function ZimbabweMapSVG() {
  return (
    <svg width="200" height="180" viewBox="0 0 200 180" fill="none" aria-hidden="true">
      {/* Rough Zimbabwe outline */}
      <path
        d="M30 40 L60 20 L120 15 L170 30 L185 60 L180 110 L160 150 L120 165 L80 160 L40 140 L20 100 L25 65 Z"
        fill="#4A7C2A" stroke="#2D5016" strokeWidth="2"
      />
      {/* Harare pin */}
      <circle cx="110" cy="70" r="8" fill="#D4891F" />
      <path d="M110 62 L110 45" stroke="#D4891F" strokeWidth="2" />
      {/* Label */}
      <text x="120" y="72" fill="white" fontSize="10" fontWeight="600">Harare</text>
    </svg>
  )
}
