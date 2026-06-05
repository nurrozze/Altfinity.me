import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function PillarCard({ icon: Icon, title, tagline, description, accent, glowClass, borderClass, gradientClass, delay = 0 }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (card) {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`glass rounded-2xl p-8 transition-all duration-300 ease-out cursor-pointer group hover:${glowClass} hover:${borderClass}`}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${borderClass}`}
          style={{ background: `linear-gradient(135deg, ${accent}15, ${accent}08)` }}
        >
          <Icon size={28} style={{ color: accent }} />
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 ${gradientClass}`}>
          {title}
        </h3>

        {/* Tagline */}
        <p className="text-sm font-mono text-text-muted mb-4 tracking-wide">
          {tagline}
        </p>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Learn More */}
        <div className="flex items-center gap-2 text-sm font-medium transition-all duration-300" style={{ color: accent }}>
          <span>Learn More</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </motion.div>
  )
}
