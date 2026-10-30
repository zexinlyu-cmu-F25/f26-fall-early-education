import { useMemo } from 'react'
import { motion } from 'motion/react'

const COLORS = ['#DE7462', '#F6C35A', '#5F7F68', '#A9C4C2', '#F79A8B']

// Hearts and confetti that pop out of a point. Remount with a new key to replay.
export default function Burst({ x, y, count = 32 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = Math.random() * Math.PI * 2
        const d = 70 + Math.random() * 150
        return {
          dx: Math.cos(a) * d,
          dy: Math.sin(a) * d - 60,
          rot: (Math.random() - 0.5) * 540,
          color: COLORS[i % COLORS.length],
          heart: i % 3 === 0,
          size: 10 + Math.random() * 10,
          delay: Math.random() * 0.1,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute z-30" style={{ left: x, top: y }} aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute -translate-1/2"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.dx, y: [0, p.dy, p.dy + 140], scale: 1, rotate: p.rot, opacity: [1, 1, 0] }}
          transition={{ duration: 1.8, delay: p.delay, ease: 'easeOut' }}
          style={{ color: p.color }}
        >
          {p.heart ? (
            <svg viewBox="0 0 24 24" style={{ width: p.size * 1.4, height: p.size * 1.4 }} fill="currentColor">
              <path d="M12 21s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 8 2.5C20 16.2 12 21 12 21z" />
            </svg>
          ) : (
            <span className="block rounded-sm" style={{ width: p.size, height: p.size * 0.55, background: 'currentColor' }} />
          )}
        </motion.span>
      ))}
    </div>
  )
}
