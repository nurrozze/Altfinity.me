import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Hexagon } from 'lucide-react'
import AISearchPreview from './AISearchPreview'
import CryptoDashboard from './CryptoDashboard'

const tabs = [
  { id: 'ai', label: 'AI Search Preview', icon: Brain, accent: 'cyan' },
  { id: 'crypto', label: 'Crypto Dashboard', icon: Hexagon, accent: 'violet' },
]

export default function InteractiveZone() {
  const [activeTab, setActiveTab] = useState('ai')

  return (
    <section id="interactive" className="relative py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0d0d18 0%, #0a0a0f 50%, #0d0d18 100%)',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-glow/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-cyan-glow/80 tracking-widest uppercase mb-4">
            Try it Now
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            The Interactive Zone
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Experience the power of the Altfinity ecosystem firsthand. 
            Preview our AI search engine or explore the crypto dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 p-1 glass rounded-xl w-fit mx-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? tab.accent === 'cyan'
                        ? 'bg-cyan-glow/15 text-cyan-glow glow-border-cyan'
                        : 'bg-violet-glow/15 text-violet-glow glow-border-violet'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="glass-strong rounded-2xl p-6 md:p-8">
            {activeTab === 'ai' && <AISearchPreview />}
            {activeTab === 'crypto' && <CryptoDashboard />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
