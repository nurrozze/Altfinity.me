import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoMark from './LogoMark'

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2900)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#000000' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 2.2, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <LogoMark size={88} animated={false} />
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Altfinity
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
