import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

const INK = '#3E322A'
const spring = { type: 'spring', stiffness: 140, damping: 14 }

const ADULT = {
  viewBox: '0 0 120 240',
  head: [60, 52, 1],
  neck: true,
  body: 'M30 96 Q60 84 90 96 L97 168 Q60 177 23 168 Z',
  legs: [[40, 164, 14, 58], [66, 164, 14, 58]],
  shoes: [[46, 224, 12], [74, 224, 12]],
  shoulders: [[37, 104], [83, 104]],
  hands: [[26, 158], [94, 158]],
  arm: 12,
}

const KID = {
  viewBox: '0 0 120 200',
  head: [60, 50, 1.18],
  neck: false,
  body: 'M36 90 Q60 80 84 90 L90 142 Q60 149 30 142 Z',
  legs: [[44, 138, 13, 42], [63, 138, 13, 42]],
  shoes: [[50, 183, 11], [70, 183, 11]],
  shoulders: [[42, 98], [78, 98]],
  hands: [[32, 136], [88, 136]],
  arm: 10,
}

const HAIR = {
  bun: {
    back: <circle cx="0" cy="-28" r="10" />,
    front: <path d="M-26 -3 Q-25 -30 0 -30 Q25 -30 26 -3 Q17 -18 0 -18 Q-17 -18 -26 -3Z" />,
  },
  short: {
    front: <path d="M-26.5 -5 Q-27 -31 0 -30 Q27 -31 26.5 -5 Q21 -19 6 -19 Q-12 -21 -26.5 -5Z" />,
  },
  pigtails: {
    back: (
      <>
        <circle cx="-28" cy="4" r="9" />
        <circle cx="28" cy="4" r="9" />
      </>
    ),
    front: <path d="M-25.5 -4 Q-23 -29 0 -29 Q23 -29 25.5 -4 Q13 -13 0 -11 Q-13 -13 -25.5 -4Z" />,
  },
  curly: {
    front: (
      <>
        {[[-21, -14], [-10, -23], [4, -25], [17, -19], [25, -7], [-26, -4]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="9.5" />
        ))}
      </>
    ),
  },
  cap: {
    front: (
      <>
        <path d="M-26 -4 Q-26 -30 0 -30 Q26 -30 26 -4 Z" />
        <path d="M14 -6 Q34 -8 38 -2 Q24 0 14 -2Z" />
      </>
    ),
  },
}

// Pupils glance toward the cursor so the characters feel alive.
function Eyes({ mood }) {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(1, d / 260) * 2.6
      el.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  if (mood === 'happy') {
    return (
      <g stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M-11 3 Q-8 -2 -5 3" />
        <path d="M5 3 Q8 -2 11 3" />
      </g>
    )
  }
  return (
    <g ref={ref} stroke="none">
      <ellipse className="blink" cx="-8" cy="2" rx="3.2" ry="3.7" fill={INK} style={{ animationDelay: `${Math.random() * 4}s` }} />
      <ellipse className="blink" cx="8" cy="2" rx="3.2" ry="3.7" fill={INK} style={{ animationDelay: `${Math.random() * 4}s` }} />
    </g>
  )
}

const MOUTH = {
  normal: <path d="M-6 10 Q0 15 6 10" fill="none" />,
  happy: <path d="M-8 9 Q0 20 8 9 Z" fill="#8E4639" />,
  oops: <path d="M-5 13 Q0 9 5 13" fill="none" />,
}

export default function Person({
  kid = false,
  skin = '#F1C6A4',
  hair = '#5B3A29',
  hairStyle = 'short',
  shirt = '#DE7462',
  pants = '#5A7470',
  mood = 'normal',
  left,
  right,
  glasses = false,
  badge = false,
  phone = false,
  className = '',
}) {
  const g = kid ? KID : ADULT
  const hands = [left ?? g.hands[0], right ?? g.hands[1]]
  const [hx, hy, hs] = g.head
  const h = HAIR[hairStyle]

  return (
    <svg viewBox={g.viewBox} preserveAspectRatio="xMidYMax meet" className={`overflow-visible ${className}`} aria-hidden="true">
      <g filter="url(#wobble)" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        {g.legs.map(([x, y, w, hh]) => (
          <rect key={x} x={x} y={y} width={w} height={hh} rx="6" fill={pants} />
        ))}
        {g.shoes.map(([x, y, rx]) => (
          <ellipse key={x} cx={x} cy={y} rx={rx} ry="6.5" fill={INK} />
        ))}
        {g.neck && <rect x="53" y="72" width="14" height="18" fill={skin} />}
        <path d={g.body} fill={shirt} />
        {badge && <rect x="66" y="116" width="13" height="16" rx="2" fill="#F6C35A" />}

        {g.shoulders.map(([sx, sy], i) => (
          <g key={i}>
            <motion.line x1={sx} y1={sy} initial={false} animate={{ x2: hands[i][0], y2: hands[i][1] }} transition={spring} strokeWidth={g.arm + 4} />
            <motion.line x1={sx} y1={sy} initial={false} animate={{ x2: hands[i][0], y2: hands[i][1] }} transition={spring} stroke={shirt} strokeWidth={g.arm} />
            <motion.circle r={kid ? 5.5 : 6.5} initial={false} animate={{ cx: hands[i][0], cy: hands[i][1] }} transition={spring} fill={skin} />
          </g>
        ))}
        {phone && (
          <motion.rect width="11" height="18" rx="2.5" fill={INK} initial={false} animate={{ x: hands[0][0] - 5.5, y: hands[0][1] - 20 }} transition={spring} />
        )}

        <g transform={`translate(${hx} ${hy}) scale(${hs})`}>
          <g fill={hair}>{h.back}</g>
          <circle r="26" fill={skin} />
          <g fill={hair}>{h.front}</g>
          <circle cx="-14" cy="9" r="4.5" fill="#F79A8B" fillOpacity="0.45" stroke="none" />
          <circle cx="14" cy="9" r="4.5" fill="#F79A8B" fillOpacity="0.45" stroke="none" />
          <Eyes mood={mood} />
          {glasses && (
            <g fill="none" strokeWidth="1.8">
              <circle cx="-8" cy="2" r="6.5" />
              <circle cx="8" cy="2" r="6.5" />
              <path d="M-1.5 1 L1.5 1" />
            </g>
          )}
          <g strokeWidth="2.4">{MOUTH[mood] ?? MOUTH.normal}</g>
        </g>
      </g>
    </svg>
  )
}
