import { motion } from 'framer-motion'
import { Brain, Hexagon, Shield } from 'lucide-react'
import PillarCard from './PillarCard'

const pillars = [
  {
    icon: Brain,
    title: 'AI Enterprise & Search',
    tagline: 'Intelligence at the speed of thought',
    description:
      'Harness next-generation AI search tools designed for enterprise. Our platform delivers instant, contextual insights powered by cutting-edge language models and neural retrieval systems.',
  },
  {
    icon: Hexagon,
    title: 'Crypto Platform',
    tagline: 'Secure. Decentralized. Yours.',
    description:
      'A Web3-native cryptocurrency platform built on transparency and security. Track tokens, execute transactions, and explore decentralized finance—all from one seamless interface.',
  },
  {
    icon: Shield,
    title: 'Professional Services',
    tagline: 'Human expertise. Digital authority.',
    description:
      'Premium consulting services at the intersection of AI, blockchain, and digital strategy. From architecture to execution, our team delivers authority-grade solutions.',
  },
]

export default function Pillars() {
  return (
    <section
      id="pillars"
      className="relative py-32 md:py-44"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-label mb-5">The Ecosystem</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5">
            Three Pillars of Innovation
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#8c8c8c' }}>
            Altfinity unifies three transformative domains into a single, powerful platform.
            Choose your entry point into the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} {...pillar} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
