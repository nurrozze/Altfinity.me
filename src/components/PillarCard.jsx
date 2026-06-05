import { motion } from 'framer-motion'

export default function PillarCard({ icon: Icon, title, tagline, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="group p-8 transition-colors duration-300 cursor-pointer"
      style={{ background: '#161616' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#1e1e1e')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '#161616')}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-7"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
      >
        <Icon size={22} style={{ color: 'rgba(255,255,255,0.65)' }} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-white mb-2">
        {title}
      </h3>

      {/* Tagline */}
      <p className="text-xs font-mono tracking-wider uppercase mb-5" style={{ color: '#4a4a4a' }}>
        {tagline}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-7" style={{ color: '#8c8c8c' }}>
        {description}
      </p>

      {/* Learn More */}
      <div
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        <span className="group-hover:text-white/70 transition-colors">Learn More</span>
        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </div>
    </motion.div>
  )
}
