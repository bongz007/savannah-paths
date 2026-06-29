import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Savannah Paths — Travel Agency | Harare, Zimbabwe',
  description:
    'Explore More, Worry Less. Expert itinerary consultation ($30) and visa consultation ($150) from Harare, Zimbabwe.',
  openGraph: {
    title: 'Savannah Paths — Travel Agency',
    description: 'Explore More, Worry Less. Creating unforgettable travel experiences from Harare, Zimbabwe.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-savannah-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
