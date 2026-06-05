import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Hexagon } from 'lucide-react'
import AISearchPreview from './AISearchPreview'
import CryptoDashboard from './CryptoDashboard'

const tabs = [
  { id: 'ai', label: 'AI Search', icon: Brain },
  { id: 'crypto', label: 'Crypto Dashboard', icon: Hexagon },
]

export default function InteractiveZone() {
  const [activeTab, setActiveTab] = useState('ai')

  return (
    <section
      id="interactive"
      className="relative py-32 md:py-44"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-label mb-5">Try it Now</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5">
            The Interactive Zone
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#8c8c8c' }}>
            Experience the Altfinity ecosystem firsthand. Preview our AI search engine
            or explore the crypto dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          {/* Tab switcher */}
          <div
            className="flex gap-1 mb-8 p-1 w-fit mx-auto rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#161616' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.10)',
                        }
                      : { color: '#8c8c8c', border: '1px solid transparent' }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#8c8c8c'
                  }}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#161616' }}
          >
            {activeTab === 'ai' && <AISearchPreview />}
            {activeTab === 'crypto' && <CryptoDashboard />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
