import Link from 'next/link'

const WA_NUMBER = '263789977673'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-savannah-dusk text-savannah-sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-display font-bold text-white text-lg mb-2">Savannah Paths</p>
          <p className="text-sm leading-relaxed opacity-80">
            Your trusted travel consultancy in Harare, Zimbabwe. We craft journeys across Africa and beyond.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/"         className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/about"    className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/book"     className="hover:text-white transition-colors">Book a Consult</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Contact</p>
          <ul className="space-y-2 text-sm">
            <li className="opacity-80">Harare, Zimbabwe</li>
            <li>
              <a href={`tel:+${WA_NUMBER}`} className="hover:text-white transition-colors">
                +263 78 997 7673
              </a>
            </li>
            <li>
              <a href="mailto:savannahpaths@gmail.com" className="hover:text-white transition-colors">
                savannahpaths@gmail.com
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-savannah-earth/30 py-4 text-center text-xs text-savannah-sand/60">
        © {year} Savannah Paths (Private) Limited. All rights reserved.
      </div>
    </footer>
  )
}
