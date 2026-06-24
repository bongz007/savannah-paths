import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Savannah Paths — Travel Consultancy | Harare, Zimbabwe',
  description:
    'Professional travel consultancy based in Harare. Expert itinerary planning ($20) and visa appointment booking ($50) for destinations across Africa and beyond.',
  openGraph: {
    title: 'Savannah Paths — Travel Consultancy',
    description: 'Expert itinerary planning and visa appointment booking from Harare, Zimbabwe.',
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
      </body>
    </html>
  )
}
