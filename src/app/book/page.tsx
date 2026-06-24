import type { Metadata } from 'next'
import { Suspense } from 'react'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Book a Consult — Savannah Paths',
  description: 'Book an itinerary consultation or visa appointment booking with Savannah Paths, Harare.',
}

export default function BookPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="section-title text-4xl">Book Your Consult</h1>
        <p className="text-savannah-earth max-w-lg mx-auto">
          Fill in the form below. We respond within 24 hours and confirm scope before any payment is requested.
        </p>
      </div>

      {/* Pricing reminder */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { service: 'Itinerary Consultation', price: '$20' },
          { service: 'Visa Appointment Booking', price: '$50' },
        ].map(({ service, price }) => (
          <div key={service} className="card text-center py-4">
            <div className="text-2xl font-bold text-savannah-amber">{price}</div>
            <div className="text-sm text-savannah-earth mt-1">{service}</div>
          </div>
        ))}
      </div>

      <Suspense>
        <LeadForm />
      </Suspense>

      <p className="text-center text-xs text-savannah-earth/60">
        Payment is only requested after we confirm availability and agree on scope.
        We accept EcoCash, ZIPIT, and USD cash (Harare).
      </p>
    </div>
  )
}
