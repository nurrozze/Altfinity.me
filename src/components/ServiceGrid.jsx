import { motion } from 'framer-motion'
import { Cpu, Link2, Lightbulb, BarChart3, FileCheck, Rocket } from 'lucide-react'

const services = [
  {
    icon: Cpu,
    title: 'AI Strategy & Consulting',
    description: 'End-to-end AI strategy from ideation to deployment.',
    accent: '#c9a84c',
  },
  {
    icon: Link2,
    title: 'Blockchain Development',
    description: 'Smart contracts, DApps, and protocol architecture.',
    accent: '#c0c0cc',
  },
  {
    icon: Lightbulb,
    title: 'Digital Transformation',
    description: 'Modernize operations with cutting-edge technology.',
    accent: '#e8c86a',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & Insights',
    description: 'Actionable intelligence from complex datasets.',
    accent: '#c9a84c',
  },
  {
    icon: FileCheck,
    title: 'Smart Contract Auditing',
    description: 'Comprehensive security audits and formal verification.',
    accent: '#c0c0cc',
  },
  {
    icon: Rocket,
    title: 'Brand & Growth Strategy',
    description: 'Strategic positioning for Web3 and AI ventures.',
    accent: '#e8c86a',
  },
]

export default function ServiceGrid() {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-6">Services</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-xl p-5 group cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${service.accent}18` }}
            >
              <service.icon size={20} style={{ color: service.accent }} />
            </div>
            <h4 className="text-sm font-bold text-text-primary mb-1.5">{service.title}</h4>
            <p className="text-xs text-text-secondary leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
