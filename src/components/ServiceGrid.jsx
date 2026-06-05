import { motion } from 'framer-motion'
import { Cpu, Link2, Lightbulb, BarChart3, FileCheck, Rocket } from 'lucide-react'

const services = [
  { icon: Cpu, title: 'AI Strategy & Consulting', description: 'End-to-end AI strategy from ideation to deployment.' },
  { icon: Link2, title: 'Blockchain Development', description: 'Smart contracts, DApps, and protocol architecture.' },
  { icon: Lightbulb, title: 'Digital Transformation', description: 'Modernize operations with cutting-edge technology.' },
  { icon: BarChart3, title: 'Data Analytics & Insights', description: 'Actionable intelligence from complex datasets.' },
  { icon: FileCheck, title: 'Smart Contract Auditing', description: 'Comprehensive security audits and formal verification.' },
  { icon: Rocket, title: 'Brand & Growth Strategy', description: 'Strategic positioning for Web3 and AI ventures.' },
]

export default function ServiceGrid() {
  return (
    <div>
      <h3
        className="text-xs font-medium uppercase tracking-[0.2em] mb-8"
        style={{ color: '#4a4a4a' }}
      >
        Services
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-6 cursor-pointer transition-colors duration-200"
            style={{ background: '#161616' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1e1e1e')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#161616')}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <service.icon size={17} style={{ color: 'rgba(255,255,255,0.45)' }} />
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight mb-2">{service.title}</h4>
            <p className="text-xs leading-relaxed" style={{ color: '#8c8c8c' }}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
