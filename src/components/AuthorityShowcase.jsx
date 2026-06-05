import { motion } from 'framer-motion'
import ServiceGrid from './ServiceGrid'
import CaseStudies from './CaseStudies'
import ContactForm from './ContactForm'

export default function AuthorityShowcase() {
  return (
    <section id="authority" className="relative py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0d0d18 0%, #0a0a0f 50%, #0d0d18 100%)',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[400px] rounded-full bg-magenta-glow/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-magenta-glow/80 tracking-widest uppercase mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Authority Showcase
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Real results across AI, blockchain, and consulting. Explore our services and
            case studies, then reach out to start your journey.
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ServiceGrid />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CaseStudies />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
