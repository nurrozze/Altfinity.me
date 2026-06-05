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
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
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
  const [txState, setTxState] = useState('idle')
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
    <div className="space-y-4">
      {/* Portfolio Balance */}
      <div
        className="rounded-xl p-5"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1e1e1e' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-label">Portfolio Balance</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: 'rgba(16,185,129,0.10)', color: '#10b981' }}
          >
            +5.3% 24h
          </span>
        </div>
        <p className="text-3xl md:text-4xl font-bold text-white tracking-tight font-mono">
          $47,218.64
        </p>
      </div>

      {/* Token grid */}
      <div className="grid grid-cols-2 gap-3">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="rounded-xl p-4 cursor-pointer transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#1e1e1e' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-sm text-white">{token.symbol}</p>
                <p className="text-xs" style={{ color: '#4a4a4a' }}>{token.name}</p>
              </div>
              <div
                className="flex items-center gap-0.5 text-xs font-mono"
                style={{ color: token.positive ? '#10b981' : '#ef4444' }}
              >
                {token.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {token.change}%
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-base font-semibold font-mono text-white">${token.price}</p>
              <Sparkline data={token.sparkline} positive={token.positive} symbol={token.symbol} />
            </div>
          </div>
        ))}
      </div>

      {/* Send Transaction */}
      <div
        className="rounded-xl p-4"
        style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#1e1e1e' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Quick Send</p>
            <p className="text-xs mt-0.5" style={{ color: '#4a4a4a' }}>
              Send 0.5 ALT → 0x7f2e...a3b1
            </p>
          </div>
          <button
            id="crypto-send-btn"
            onClick={handleSend}
            disabled={txState !== 'idle'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200"
            style={
              txState === 'idle'
                ? { border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.70)' }
                : txState === 'sending'
                ? { border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.30)', cursor: 'wait' }
                : { border: '1px solid rgba(16,185,129,0.30)', color: '#10b981' }
            }
          >
            {txState === 'idle' && <><Send size={13} />Send</>}
            {txState === 'sending' && <><Loader2 size={13} className="animate-spin" />Confirming…</>}
            {txState === 'confirmed' && <><Check size={13} />Confirmed</>}
          </button>
        </div>

        {txState === 'sending' && (
          <div
            className="mt-3 h-px overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="h-full rounded-full animate-shimmer"
              style={{ background: 'rgba(255,255,255,0.35)', backgroundSize: '200% 100%', width: '100%' }}
            />
          </div>
        )}

        {txState === 'confirmed' && (
          <div className="mt-3 flex items-center gap-2 text-xs font-mono" style={{ color: '#10b981' }}>
            <Check size={11} />
            Tx: 0x8f3a...d7e2 · Block #18,294,571 · 0.0021 ETH gas
          </div>
        )}
      </div>
    </div>
  )
}
