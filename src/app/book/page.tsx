import type { Metadata } from 'next'
import WhatsAppBooking from '@/components/WhatsAppBooking'

export const metadata: Metadata = {
  title: 'Book a Consult — Savannah Paths',
  description: 'Book an itinerary consultation or visa consultation with Savannah Paths via WhatsApp.',
}

export default function BookPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="section-title text-4xl">Start Your Journey</h1>
        <p className="text-savannah-earth max-w-lg mx-auto">
          Pick your service, add your destination, and open WhatsApp — we reply within the hour.
        </p>
      </div>
      <WhatsAppBooking />
    </div>
  )
}
