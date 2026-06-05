import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const caseStudies = [
  {
    title: 'Neural Search Infrastructure',
    category: 'AI Enterprise',
    description: 'Designed and deployed a large-scale neural search pipeline for a Fortune 500 financial services firm, achieving 3.7x improvement in retrieval accuracy.',
  },
  {
    title: 'DeFi Yield Protocol',
    category: 'Blockchain',
    description: 'Built a decentralized yield optimization protocol managing $12M TVL across multiple chains with automated rebalancing strategies.',
  },
  {
    title: 'Enterprise AI Assistant',
    category: 'AI Enterprise',
    description: 'Developed a domain-specific AI assistant for a healthcare network, reducing clinical documentation time by 40% across 200+ providers.',
  },
  {
    title: 'Tokenized Real Estate Platform',
    category: 'Blockchain',
    description: 'Architected a compliant tokenized real estate investment platform with fractional ownership, KYC/AML integration, and secondary market trading.',
  },
  {
    title: 'Digital Transformation Roadmap',
    category: 'Consulting',
    description: 'Led a comprehensive digital transformation initiative for a mid-market manufacturing company, modernizing operations across 8 facilities.',
  },
]

export default function CaseStudies() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3
          className="text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: '#4a4a4a' }}
        >
          Case Studies
        </h3>
        <div className="flex gap-2">
          {['left', 'right'].map((dir) => (
            <button
              key={dir}
              id={`case-scroll-${dir}`}
              onClick={() => scroll(dir)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#4a4a4a' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4a4a4a'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
              aria-label={`Scroll ${dir}`}
            >
              {dir === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="shrink-0 w-[290px] rounded-xl p-6 cursor-pointer transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.07)', borderLeft: '2px solid rgba(255,255,255,0.15)', background: '#161616' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1e1e1e')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#161616')}
          >
            <span
              className="text-xs font-mono tracking-[0.15em] uppercase mb-3 block"
              style={{ color: '#4a4a4a' }}
            >
              {study.category}
            </span>
            <h4 className="text-sm font-bold text-white tracking-tight mb-3">{study.title}</h4>
            <p className="text-xs leading-relaxed mb-5" style={{ color: '#8c8c8c' }}>
              {study.description}
            </p>
            <div
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-200"
              style={{ color: '#4a4a4a' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4a4a4a')}
            >
              <span>View Case Study</span>
              <ExternalLink size={11} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
