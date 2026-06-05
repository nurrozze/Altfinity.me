import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import LogoMark from './LogoMark'

export default function Hero({ splashDone }) {
  const scrollToSection = (e) => {
    e.preventDefault()
    const el = document.querySelector('#pillars')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = (e) => {
    e.preventDefault()
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Delay content animations until after splash exits (~2.2s)
  const baseDelay = splashDone ? 0 : 2.4

  return (
    <section
      id="hero"
      className="relative min-h-[115vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #111114 0%, #1a1520 50%, #111114 100%)',
      }}
    >
      <ParticleBackground />

      {/* Ambient glow orbs — gold & silver */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(192,192,204,0.04) 0%, transparent 70%)' }} />

      {/* Logo watermark — fades in as splash exits */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 0.06 : 0 }}
        transition={{ duration: 1.2, delay: splashDone ? 0 : 2.0 }}
      >
        <LogoMark size={Math.min(typeof window !== 'undefined' ? window.innerHeight * 0.65 : 520, 520)} />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-28">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: baseDelay, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-xs font-mono text-gold/90 tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-glow" />
            Welcome to the Ecosystem
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: baseDelay + 0.15, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-extrabold leading-[1.05] tracking-tight mb-6"
        >
          <span className="gradient-text">The Future of</span>
          <br />
          <span className="gradient-text">Digital Authority</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12"
        >
          AI Enterprise{' '}
          <span className="text-gold">·</span>{' '}
          Crypto Platform{' '}
          <span className="text-silver">·</span>{' '}
          Professional Services
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            id="cta-explore"
            onClick={scrollToSection}
            className="cta-button text-base md:text-lg"
          >
            Explore the Ecosystem
          </button>
          <button
            onClick={scrollToContact}
            className="cta-button-ghost text-base md:text-lg"
          >
            View Services
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay + 1.0, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-gold/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
