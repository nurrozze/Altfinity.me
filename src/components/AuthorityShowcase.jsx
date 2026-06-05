import { motion } from 'framer-motion'
import ServiceGrid from './ServiceGrid'
import CaseStudies from './CaseStudies'
import ContactForm from './ContactForm'

export default function AuthorityShowcase() {
  return (
    <section
      id="authority"
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
          <p className="text-label mb-5">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5">
            Authority Showcase
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#8c8c8c' }}>
            Real results across AI, blockchain, and consulting. Explore our services and
            case studies, then reach out to start your journey.
          </p>
        </motion.div>

        <div className="space-y-20">
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
