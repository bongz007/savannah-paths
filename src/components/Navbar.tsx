'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-savannah-green text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <CompassRoseLogo />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg tracking-widest uppercase">Savannah Paths</span>
            <span className="text-[9px] tracking-[0.2em] text-savannah-sand/80 uppercase">Travel Agency</span>
          </div>
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

function CompassRoseLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Outer circle */}
      <circle cx="18" cy="18" r="17" stroke="#C9A96E" strokeWidth="1.2" fill="none"/>
      {/* Inner circle */}
      <circle cx="18" cy="18" r="13" stroke="#C9A96E" strokeWidth="0.6" fill="none"/>
      {/* 8-point star compass rose */}
      {/* Cardinal points (N/S/E/W) — longer */}
      <path d="M18 2 L20 15 L18 18 L16 15 Z" fill="#F7F2E8"/>
      <path d="M18 34 L20 21 L18 18 L16 21 Z" fill="#C9A96E"/>
      <path d="M2 18 L15 16 L18 18 L15 20 Z" fill="#C9A96E"/>
      <path d="M34 18 L21 16 L18 18 L21 20 Z" fill="#F7F2E8"/>
      {/* Ordinal points (NE/NW/SE/SW) — shorter */}
      <path d="M18 18 L26.5 9.5 L24 16 Z" fill="#F7F2E8" opacity="0.7"/>
      <path d="M18 18 L9.5 9.5 L12 16 Z" fill="#F7F2E8" opacity="0.7"/>
      <path d="M18 18 L26.5 26.5 L20 24 Z" fill="#C9A96E" opacity="0.7"/>
      <path d="M18 18 L9.5 26.5 L16 24 Z" fill="#C9A96E" opacity="0.7"/>
      {/* Centre dot */}
      <circle cx="18" cy="18" r="2" fill="#D4891F"/>
    </svg>
  )
}
