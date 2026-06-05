import { motion } from 'framer-motion'

/**
 * Altfinity geometric "A" logo mark.
 * Two overlapping triangles: outer silver frame + inner gold triangle.
 *
 * Props:
 *   size       — pixel dimension (width = height), default 48
 *   animated   — if true, paths draw in via pathLength animation
 *   delay      — animation start delay in seconds (default 0)
 *   className  — extra classes for the <svg> element
 */
export default function LogoMark({ size = 48, animated = false, delay = 0, className = '' }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: custom.duration, delay: delay + custom.delay, ease: 'easeInOut' },
        opacity: { duration: 0.1, delay: delay + custom.delay },
      },
    }),
  }

  const fillVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: custom.opacity,
      transition: { duration: 0.4, delay: delay + custom.delay },
    }),
  }

  const PathEl = animated ? motion.path : 'path'
  const PolyEl = animated ? motion.polygon : 'polygon'

  const silverProps = animated
    ? { variants: pathVariants, custom: { duration: 0.9, delay: 0 }, initial: 'hidden', animate: 'visible' }
    : {}

  const goldProps = animated
    ? { variants: fillVariants, custom: { opacity: 1, delay: 0.9 }, initial: 'hidden', animate: 'visible' }
    : {}

  const goldStrokeProps = animated
    ? { variants: pathVariants, custom: { duration: 0.6, delay: 0.9 }, initial: 'hidden', animate: 'visible' }
    : {}

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Altfinity logo"
    >
      {/* Silver outer frame — upward triangle, open/cut at bottom corners */}
      {/* Left leg */}
      <PathEl
        d="M50 8 L10 88 L28 88 L50 42 L72 88 L90 88 L50 8Z"
        fill="none"
        stroke="url(#silverGrad)"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
        {...silverProps}
      />

      {/* Inner gold triangle — smaller, sits inside the outer */}
      <PolyEl
        points="50,22 36,58 64,58"
        fill="url(#goldGrad)"
        {...(animated
          ? { variants: fillVariants, custom: { opacity: 1, delay: 0.85 }, initial: 'hidden', animate: 'visible' }
          : {})}
      />

      {/* Gold inner outline for crispness */}
      <PathEl
        d="M50 22 L36 58 L64 58 Z"
        fill="none"
        stroke="url(#goldStrokeGrad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        {...goldStrokeProps}
      />

      <defs>
        <linearGradient id="silverGrad" x1="50" y1="8" x2="50" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e4e4f0" />
          <stop offset="100%" stopColor="#888898" />
        </linearGradient>

        <linearGradient id="goldGrad" x1="50" y1="22" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8c86a" />
          <stop offset="100%" stopColor="#9a7a28" />
        </linearGradient>

        <linearGradient id="goldStrokeGrad" x1="50" y1="22" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8c86a" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
    </svg>
  )
}
