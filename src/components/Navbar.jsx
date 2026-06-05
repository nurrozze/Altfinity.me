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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.20)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center gap-2.5 group"
        >
          <LogoMark size={26} />
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
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
              className="text-xs font-medium uppercase tracking-wider transition-colors duration-200"
              style={{ color: '#8c8c8c' }}
              onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.target.style.color = '#8c8c8c')}
            >
              {link.label}
            </a>
          ))}

          {/* CTA pill */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="ml-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.20)',
              color: 'rgba(255,255,255,0.80)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.50)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.80)'
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 transition-colors duration-200"
          style={{ color: '#8c8c8c' }}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
      >
        <div className="px-6 py-5 flex flex-col gap-4" style={{ background: 'rgba(0,0,0,0.95)' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium uppercase tracking-wider transition-colors duration-200 py-1"
              style={{ color: '#8c8c8c' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="mt-1 px-5 py-2.5 rounded-full text-sm font-medium text-center transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
