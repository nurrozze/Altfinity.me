import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoMark from './LogoMark'

/**
 * Full-screen loading splash.
 * Sequence:
 *   0.0s  — screen appears
 *   0.2s  — silver outer paths draw in (0.9s)
 *   0.9s  — gold inner fills in (0.6s)
 *   1.8s  — brief hold with gold pulse
 *   2.2s  — entire overlay fades out (0.7s)
 *   2.9s  — onComplete fires
 */
export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2900)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#0d0d10' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 2.2, ease: 'easeInOut' }}
    >
      {/* Subtle radial glow behind logo */}
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.8, ease: 'easeOut' }}
      />

      {/* Logo — draws in animated */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <LogoMark size={120} animated delay={0.2} />
      </motion.div>

      {/* "Altfinity" wordmark fades in after logo draws */}
      <motion.p
        className="absolute font-sans font-light tracking-[0.35em] uppercase text-sm"
        style={{ top: 'calc(50% + 80px)', color: 'rgba(192,192,204,0.7)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
      >
        Altfinity
      </motion.p>
    </motion.div>
  )
}
