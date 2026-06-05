import { motion } from 'framer-motion'

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

  const baseDelay = splashDone ? 0 : 2.4

  return (
    <section
      id="hero"
      className="relative min-h-[115vh] flex items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: baseDelay, ease: 'easeOut' }}
          className="mb-8"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-label"
            style={{ border: '1px solid rgba(255,255,255,0.10)' }}
          >
            Welcome to the Ecosystem
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + 0.12, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-extrabold tracking-tight leading-[1.02] text-white mb-6"
        >
          The Future of<br />Digital Authority
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: baseDelay + 0.26, ease: 'easeOut' }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#8c8c8c' }}
        >
          AI Enterprise · Crypto Platform · Professional Services
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: baseDelay + 0.38, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            id="cta-explore"
            onClick={scrollToSection}
            className="cta-button text-sm md:text-base"
          >
            Explore the Ecosystem
          </button>
          <button
            onClick={scrollToContact}
            className="cta-button-ghost text-sm md:text-base"
          >
            View Services
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay + 0.9, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.35)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
