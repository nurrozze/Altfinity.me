import { useState, useEffect, useRef } from 'react'
import { Search, Sparkles, Zap } from 'lucide-react'

const sampleQueries = [
  'What are the latest trends in AI-powered search?',
  'Explain blockchain consensus mechanisms',
  'How does neural information retrieval work?',
]

const mockResponses = {
  default: `**AI-Powered Search Analysis**

Neural retrieval systems have evolved significantly in 2026, combining dense vector representations with sparse lexical matching for hybrid search architectures.

Key developments include:
• **Contextual embeddings** that understand query intent beyond keywords
• **Multi-modal search** across text, images, and structured data
• **Real-time knowledge graph** integration for entity-aware results

These advances enable enterprise search platforms like Altfinity to deliver 10x more relevant results compared to traditional keyword-based systems.

*Powered by Altfinity AI Engine v3.2*`,
}

export default function AISearchPreview() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [placeholder, setPlaceholder] = useState('')

  // Refs for cleanup
  const timerRef = useRef(null)
  const intervalRef = useRef(null)

  // Typing placeholder animation — Bug 2 fix: use timerRef so cleanup always cancels the live timer
  useEffect(() => {
    const target = sampleQueries[placeholderIdx]
    let charIdx = 0
    let direction = 1 // 1 = typing, -1 = deleting

    const tick = () => {
      if (direction === 1) {
        charIdx++
        setPlaceholder(target.slice(0, charIdx))
        if (charIdx === target.length) {
          timerRef.current = setTimeout(() => { direction = -1; tick() }, 2000)
          return
        }
      } else {
        charIdx--
        setPlaceholder(target.slice(0, charIdx))
        if (charIdx === 0) {
          setPlaceholderIdx((prev) => (prev + 1) % sampleQueries.length)
          return
        }
      }
      timerRef.current = setTimeout(tick, direction === 1 ? 60 : 30)
    }

    tick()
    return () => clearTimeout(timerRef.current)
  }, [placeholderIdx])

  // Cancel streaming interval on unmount — Bug 4 fix
  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  // Bug 4 fix: shared streaming helper — eliminates duplication and stores handle in ref
  const startStream = () => {
    clearInterval(intervalRef.current)
    const text = mockResponses.default
    setResponse('')
    setIsStreaming(true)
    let idx = 0
    intervalRef.current = setInterval(() => {
      idx++
      setResponse(text.slice(0, idx))
      if (idx >= text.length) {
        clearInterval(intervalRef.current)
        setIsStreaming(false)
      }
    }, 12)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isStreaming) return
    startStream()
  }

  // Bug 3 fix: add isStreaming guard, same as handleSubmit
  const handleSampleClick = (q) => {
    if (isStreaming) return
    setQuery(q)
    startStream()
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass rounded-xl p-1 glow-border-gold flex items-center">
          <div className="flex items-center gap-3 px-4 flex-1">
            <Search size={20} className="text-gold/60 shrink-0" />
            <input
              id="ai-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder + '|'}
              className="w-full bg-transparent border-none outline-none text-text-primary placeholder-text-muted py-3 text-sm md:text-base font-light"
            />
          </div>
          <button
            type="submit"
            id="ai-search-submit"
            className="shrink-0 bg-gradient-to-r from-gold/20 to-gold/10 hover:from-gold/30 hover:to-gold/20 text-gold px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles size={16} />
            Search
          </button>
        </div>
      </form>

      {/* Sample Queries */}
      <div className="flex flex-wrap gap-2">
        {sampleQueries.map((q) => (
          <button
            key={q}
            onClick={() => handleSampleClick(q)}
            className="text-xs px-3 py-1.5 rounded-full glass glow-border-gold text-text-muted hover:text-gold transition-colors duration-300"
          >
            <Zap size={10} className="inline mr-1" />
            {q.length > 35 ? q.slice(0, 35) + '…' : q}
          </button>
        ))}
      </div>

      {/* Response Area */}
      {response && (
        <div className="glass rounded-xl p-6 glow-border-gold glow-gold">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-xs font-mono text-gold/70">Altfinity AI Engine</span>
          </div>
          <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-light">
            {response.split('**').map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-text-primary font-semibold">{part}</strong>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-gold/60 ml-0.5" style={{ animation: 'typing-cursor 0.8s infinite' }} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
