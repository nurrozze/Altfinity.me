import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const caseStudies = [
  {
    title: 'Neural Search Infrastructure',
    category: 'AI Enterprise',
    description: 'Designed and deployed a large-scale neural search pipeline for a Fortune 500 financial services firm, achieving 3.7x improvement in retrieval accuracy.',
    accent: '#00d4ff',
  },
  {
    title: 'DeFi Yield Protocol',
    category: 'Blockchain',
    description: 'Built a decentralized yield optimization protocol managing $12M TVL across multiple chains with automated rebalancing strategies.',
    accent: '#8b5cf6',
  },
  {
    title: 'Enterprise AI Assistant',
    category: 'AI Enterprise',
    description: 'Developed a domain-specific AI assistant for a healthcare network, reducing clinical documentation time by 40% across 200+ providers.',
    accent: '#00d4ff',
  },
  {
    title: 'Tokenized Real Estate Platform',
    category: 'Blockchain',
    description: 'Architected a compliant tokenized real estate investment platform with fractional ownership, KYC/AML integration, and secondary market trading.',
    accent: '#8b5cf6',
  },
  {
    title: 'Digital Transformation Roadmap',
    category: 'Consulting',
    description: 'Led a comprehensive digital transformation initiative for a mid-market manufacturing company, modernizing operations across 8 facilities.',
    accent: '#f472b6',
  },
]

export default function CaseStudies() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 340
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary">Case Studies</h3>
        <div className="flex gap-2">
          <button
            id="case-scroll-left"
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            id="case-scroll-right"
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="shrink-0 w-[300px] glass rounded-xl p-6 group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            style={{ borderLeft: `3px solid ${study.accent}` }}
          >
            <span
              className="text-xs font-mono tracking-wider uppercase mb-3 block"
              style={{ color: study.accent }}
            >
              {study.category}
            </span>
            <h4 className="text-base font-bold text-text-primary mb-3">{study.title}</h4>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{study.description}</p>
            <div
              className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all duration-300"
              style={{ color: study.accent }}
            >
              <span>View Case Study</span>
              <ExternalLink size={12} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
