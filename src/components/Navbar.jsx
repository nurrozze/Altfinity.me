import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import LogoMark from './LogoMark'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Ecosystem', href: '#pillars' },
  { label: 'Interactive', href: '#interactive' },
  { label: 'Services', href: '#authority' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-black/30'
          : 'bg-white/[0.02] border-b border-white/[0.05]'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center gap-2.5 group"
        >
          <LogoMark size={28} />
          <span className="text-xl md:text-2xl font-bold gradient-text tracking-tight">
            Altfinity
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-silver group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* CTA pill */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="ml-2 px-5 py-2 rounded-full border border-gold/40 text-gold text-sm font-semibold bg-gold/5 hover:bg-gold/10 hover:border-gold/70 transition-all duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-strong border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="mt-2 px-5 py-2.5 rounded-full border border-gold/40 text-gold text-sm font-semibold text-center bg-gold/5"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
