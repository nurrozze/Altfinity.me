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
    <footer className="relative border-t border-white/5" style={{ background: '#08080e' }}>
      <div className="section-container py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#hero"
          onClick={scrollToTop}
          className="text-xl font-bold gradient-text tracking-tight shrink-0"
        >
          Altfinity
        </a>

        {/* Copyright */}
        <p className="text-xs text-text-muted text-center">
          © 2026 Altfinity. All rights reserved.
        </p>

        {/* Right: socials + back to top */}
        <div className="flex items-center gap-4 shrink-0">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-text-muted hover:text-text-primary transition-colors duration-300"
            >
              <Icon size={18} />
            </a>
          ))}

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-2 w-8 h-8 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-300"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
