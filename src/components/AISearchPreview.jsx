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
  const timerRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const target = sampleQueries[placeholderIdx]
    let charIdx = 0
    let direction = 1

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

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

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

  const handleSampleClick = (q) => {
    if (isStreaming) return
    setQuery(q)
    startStream()
  }

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center rounded-xl p-1"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-3 px-4 flex-1">
            <Search size={18} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
            <input
              id="ai-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder + '|'}
              className="w-full bg-transparent border-none outline-none py-3 text-sm font-light"
              style={{ color: '#ffffff', caretColor: 'rgba(255,255,255,0.6)' }}
            />
          </div>
          <button
            type="submit"
            id="ai-search-submit"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
            }}
          >
            <Sparkles size={13} />
            Search
          </button>
        </div>
      </form>

      {/* Sample query pills */}
      <div className="flex flex-wrap gap-2">
        {sampleQueries.map((q) => (
          <button
            key={q}
            onClick={() => handleSampleClick(q)}
            className="text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#4a4a4a' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.70)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.color = '#4a4a4a'
            }}
          >
            <Zap size={9} className="inline mr-1 opacity-60" />
            {q.length > 40 ? q.slice(0, 40) + '…' : q}
          </button>
        ))}
      </div>

      {/* Response area */}
      {response && (
        <div
          className="pt-5 mt-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-label mb-4">Altfinity AI Engine</p>
          <div
            className="text-sm leading-relaxed whitespace-pre-wrap font-light"
            style={{ color: '#8c8c8c' }}
          >
            {response.split('**').map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-white font-semibold">{part}</strong>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
            {isStreaming && (
              <span
                className="inline-block w-[2px] h-3.5 ml-0.5 align-middle"
                style={{ background: 'rgba(255,255,255,0.45)', animation: 'typing-cursor 0.8s infinite' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
