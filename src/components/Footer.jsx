import { GitFork, X, Globe, ArrowUp } from 'lucide-react'

const socialLinks = [
  { icon: GitFork, href: '#', label: 'GitHub' },
  { icon: X, href: '#', label: 'X / Twitter' },
  { icon: Globe, href: '#', label: 'Website' },
]

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    const el = document.querySelector('#hero')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-container py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#hero"
          onClick={scrollToTop}
          className="text-xl font-bold text-white tracking-tight shrink-0"
        >
          Altfinity
        </a>

        {/* Copyright */}
        <p className="text-xs text-center" style={{ color: '#4a4a4a' }}>
          © 2026 Altfinity. All rights reserved.
        </p>

        {/* Socials + back to top */}
        <div className="flex items-center gap-4 shrink-0">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: '#4a4a4a' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4a4a4a')}
            >
              <Icon size={17} />
            </a>
          ))}

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#4a4a4a' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#4a4a4a'
            }}
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
