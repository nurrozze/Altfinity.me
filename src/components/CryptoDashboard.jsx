import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, ArrowDownRight, Send, Check, Loader2 } from 'lucide-react'

const tokens = [
  {
    symbol: 'ALT',
    name: 'Altfinity',
    price: '2.847',
    change: '+12.4',
    positive: true,
    sparkline: [20, 25, 22, 30, 28, 35, 32, 40, 38, 45, 42, 48],
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '107,842',
    change: '+3.2',
    positive: true,
    sparkline: [60, 58, 62, 65, 63, 68, 70, 67, 72, 75, 73, 78],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '3,891',
    change: '-1.8',
    positive: false,
    sparkline: [50, 52, 48, 45, 47, 43, 44, 42, 40, 43, 41, 38],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '247.63',
    change: '+8.7',
    positive: true,
    sparkline: [30, 35, 32, 38, 40, 42, 45, 43, 48, 50, 52, 55],
  },
]

// Bug 5 fix: use symbol as gradient ID to avoid collisions across instances
function Sparkline({ data, positive, symbol }) {
  const h = 32
  const w = 80
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ')

  const color = positive ? '#10b981' : '#ef4444'
  const gradId = `grad-${symbol}`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#${gradId})`}
      />
    </svg>
  )
}

export default function CryptoDashboard() {
  const [txState, setTxState] = useState('idle') // idle | sending | confirmed

  // Bug 6 fix: store timer handles in refs and cancel on unmount
  const timer1Ref = useRef(null)
  const timer2Ref = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timer1Ref.current)
      clearTimeout(timer2Ref.current)
    }
  }, [])

  const handleSend = () => {
    if (txState !== 'idle') return
    setTxState('sending')
    timer1Ref.current = setTimeout(() => setTxState('confirmed'), 2500)
    timer2Ref.current = setTimeout(() => setTxState('idle'), 5000)
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Balance */}
      <div className="glass rounded-xl p-6 glow-border-violet">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Portfolio Balance</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-mono">+5.3% 24h</span>
        </div>
        <p className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
          $<span className="font-mono">47,218.64</span>
        </p>
      </div>

      {/* Token Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="glass rounded-xl p-4 hover:glow-border-violet transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-sm text-text-primary">{token.symbol}</p>
                <p className="text-xs text-text-muted">{token.name}</p>
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-mono ${token.positive ? 'text-success' : 'text-danger'}`}>
                {token.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {token.change}%
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-lg font-semibold font-mono text-text-primary">${token.price}</p>
              <Sparkline data={token.sparkline} positive={token.positive} symbol={token.symbol} />
            </div>
          </div>
        ))}
      </div>

      {/* Send Transaction */}
      <div className="glass rounded-xl p-4 glow-border-violet">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Quick Send</p>
            <p className="text-xs text-text-muted">Send 0.5 ALT → 0x7f2e...a3b1</p>
          </div>
          <button
            id="crypto-send-btn"
            onClick={handleSend}
            disabled={txState !== 'idle'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              txState === 'idle'
                ? 'bg-gold/15 text-gold hover:bg-gold/25 glow-border-gold'
                : txState === 'sending'
                ? 'bg-gold/8 text-gold/60 cursor-wait'
                : 'bg-success/20 text-success glow-border-gold'
            }`}
          >
            {txState === 'idle' && (
              <>
                <Send size={14} />
                Send
              </>
            )}
            {txState === 'sending' && (
              <>
                <Loader2 size={14} className="animate-spin" />
                Confirming...
              </>
            )}
            {txState === 'confirmed' && (
              <>
                <Check size={14} />
                Confirmed!
              </>
            )}
          </button>
        </div>

        {/* Progress bar */}
        {txState === 'sending' && (
          <div className="mt-3 h-1 rounded-full bg-gold/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              style={{
                animation: 'shimmer 2s ease-in-out',
                width: '100%',
                transition: 'width 2.5s ease-in-out',
              }}
            />
          </div>
        )}

        {txState === 'confirmed' && (
          <div className="mt-3 flex items-center gap-2 text-xs text-success font-mono">
            <Check size={12} />
            Tx: 0x8f3a...d7e2 • Block #18,294,571 • 0.0021 ETH gas
          </div>
        )}
      </div>
    </div>
  )
}
