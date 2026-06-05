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
    accent: '#c9a84c',
    glowClass: 'glow-gold',
    borderClass: 'glow-border-gold',
    gradientClass: 'gradient-text-gold',
  },
  {
    icon: Hexagon,
    title: 'Crypto Platform',
    tagline: 'Secure. Decentralized. Yours.',
    description:
      'A Web3-native cryptocurrency platform built on transparency and security. Track tokens, execute transactions, and explore decentralized finance—all from one seamless interface.',
    accent: '#c0c0cc',
    glowClass: 'glow-silver',
    borderClass: 'glow-border-silver',
    gradientClass: 'gradient-text-silver',
  },
  {
    icon: Shield,
    title: 'Professional Services',
    tagline: 'Human expertise. Digital authority.',
    description:
      'Premium consulting services at the intersection of AI, blockchain, and digital strategy. From architecture to execution, our team delivers authority-grade solutions.',
    accent: '#e8c86a',
    glowClass: 'glow-gold',
    borderClass: 'glow-border-gold',
    gradientClass: 'gradient-text-gold',
  },
]

export default function Pillars() {
  return (
    <section id="pillars" className="relative py-32 md:py-44">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #111114 0%, #17161c 50%, #111114 100%)',
        }}
      />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-gold/80 tracking-widest uppercase mb-4">
            The Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Three Pillars of Innovation
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Altfinity unifies three transformative domains into a single, powerful platform.
            Choose your entry point into the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} {...pillar} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
