'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-savannah-green text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-wide">
          <SavannahIcon />
          Savannah Paths
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/services" className="hover:text-savannah-sand transition-colors">Services</Link>
          <Link href="/about" className="hover:text-savannah-sand transition-colors">About</Link>
          <Link href="/book" className="btn-primary text-sm py-2 px-5">Book Now</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-savannah-green-light transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-savannah-green border-t border-savannah-green-light px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/services" className="py-2 hover:text-savannah-sand transition-colors" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/about"    className="py-2 hover:text-savannah-sand transition-colors" onClick={() => setOpen(false)}>About</Link>
          <Link href="/book"     className="btn-primary text-center mt-1" onClick={() => setOpen(false)}>Book Now</Link>
        </div>
      )}
    </nav>
  )
}

function SavannahIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="#D4891F" />
      {/* Sun */}
      <circle cx="14" cy="10" r="3" fill="#F7F2E8" />
      {/* Ground line */}
      <path d="M2 20 Q8 16 14 18 Q20 20 26 16" stroke="#4A7C2A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Acacia silhouette */}
      <path d="M14 18 L14 22" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 17 Q14 15 17 17" stroke="#2D5016" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}
