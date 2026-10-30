import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Person from './Person.jsx'
import { bell, boop } from '../lib/sound.js'

const KIDS = [
  { left: '6%', bottom: '7%', hairStyle: 'pigtails', hair: '#6B3E26', skin: '#E8B48F', shirt: '#F6C35A', pants: '#DE7462' },
  { left: '18%', bottom: '3%', hairStyle: 'cap', hair: '#5A7470', skin: '#C68B63', shirt: '#A9C4C2', pants: '#5C4A3D' },
  { left: '31%', bottom: '9%', hairStyle: 'curly', hair: '#2B1D17', skin: '#8D5A3B', shirt: '#F79A8B', pants: '#554B4A' },
  { left: '64%', bottom: '8%', hairStyle: 'short', hair: '#C9853E', skin: '#F3D2B5', shirt: '#5F7F68', pants: '#4A6360' },
  { left: '77%', bottom: '3%', hairStyle: 'bun', hair: '#3E322A', skin: '#E0AC88', shirt: '#DE7462', pants: '#5A7470' },
  { left: '89%', bottom: '10%', hairStyle: 'pigtails', hair: '#E3B15B', skin: '#F6D7C3', shirt: '#D9A79B', pants: '#5C4A3D' },
]

function Kid({ kid, ringing }) {
  const [jumps, setJumps] = useState(0)
  const hop = jumps + ringing
  return (
    <motion.button
      className="absolute w-[11%] origin-bottom cursor-pointer sm:w-[6.5%]"
      style={{ left: kid.left, bottom: kid.bottom }}
      whileHover={{ scale: 1.08, rotate: -3 }}
      onClick={() => {
        boop()
        setJumps((j) => j + 1)
      }}
      aria-label="Say hi"
    >
      <motion.div key={hop} initial={{ y: 0 }} animate={hop ? { y: [0, -34, 0, -10, 0] } : {}} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <Person kid mood={hop ? 'happy' : 'normal'} {...kid} left={hop ? [22, 62] : undefined} right={hop ? [98, 62] : undefined} />
      </motion.div>
    </motion.button>
  )
}

function SchoolScene({ onBell, minuteX, minuteY }) {
  return (
    <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g stroke="#3E322A" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="1010" cy="110" r="95" fill="#F6C35A" fillOpacity="0.25" stroke="none" />
        <circle cx="1010" cy="110" r="58" fill="#F6C35A" />
        <g className="drift" fill="#FFFBF4">
          <path d="M140 120 q10 -34 46 -24 q18 -30 52 -10 q34 -6 34 28 q0 18 -24 18 h-96 q-26 0 -12 -12z" />
          <path d="M820 70 q8 -24 34 -18 q14 -22 40 -6 q24 -4 24 20 q0 13 -18 13 h-70 q-20 0 -10 -9z" />
        </g>

        <path d="M0 360 Q200 290 430 340 T850 320 T1200 340 V520 H0Z" fill="#B5C8B8" filter="url(#rough)" />

        <g filter="url(#rough)">
          <rect x="250" y="250" width="16" height="110" fill="#8A5A3C" />
          <circle cx="258" cy="235" r="52" fill="#5F7F68" />
          <circle cx="225" cy="262" r="34" fill="#5F7F68" />
          <circle cx="292" cy="258" r="36" fill="#5F7F68" />
          <rect x="940" y="260" width="16" height="100" fill="#8A5A3C" />
          <circle cx="948" cy="244" r="46" fill="#86A08C" />
          <circle cx="978" cy="270" r="30" fill="#86A08C" />
        </g>

        <polygon points="405,236 600,150 795,236" fill="#C25F4E" />
        <rect x="430" y="232" width="340" height="190" fill="#F79A8B" />
        {[475, 535, 665, 725].map((x) =>
          [260, 330].map((y) => (
            <g key={`${x}${y}`}>
              <rect x={x - 22} y={y} width="44" height="44" rx="6" fill="#DCE7E3" />
              <path d={`M${x} ${y} V${y + 44} M${x - 22} ${y + 22} H${x + 22}`} strokeWidth="2.5" />
            </g>
          )),
        )}
        <path d="M570 422 V360 Q600 322 630 360 V422 Z" fill="#7A4B35" />
        <circle cx="618" cy="390" r="3.5" fill="#F6C35A" />

        <rect x="565" y="74" width="70" height="110" fill="#FFFBF4" />
        <polygon points="552,76 600,30 648,76" fill="#C25F4E" />
        <g className="cursor-pointer" onClick={onBell}>
          <rect x="575" y="80" width="50" height="38" fill="#FFFBF4" stroke="none" />
          <path d="M586 110 Q586 86 600 86 Q614 86 614 110 Z" fill="#F6C35A" />
          <circle cx="600" cy="113" r="3.5" fill="#3E322A" />
        </g>
        <circle cx="600" cy="150" r="22" fill="#FFFBF4" />
        <line x1="600" y1="150" x2="613" y2="150" strokeWidth="3.5" />
        <motion.line x1="600" y1="150" x2={minuteX} y2={minuteY} strokeWidth="2.5" />
        <circle cx="600" cy="150" r="2.5" fill="#3E322A" />

        <path d="M0 440 Q300 395 600 425 T1200 415 V520 H0Z" fill="#7E9A84" filter="url(#rough)" />
        <path d="M570 422 Q590 470 560 520 H660 Q620 470 630 422 Z" fill="#F3E2C3" />
        {[[120, 470, '#F79A8B'], [360, 455, '#F6C35A'], [820, 468, '#FFFBF4'], [1080, 455, '#F79A8B'], [470, 490, '#FFFBF4']].map(([x, y, c]) => (
          <circle key={x} cx={x} cy={y} r="6" fill={c} strokeWidth="2" />
        ))}
      </g>
    </svg>
  )
}

export default function Schoolyard() {
  const ref = useRef(null)
  const [ring, setRing] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // Scrolling to the bottom of the page moves the tower clock from 2:50 to 3:00.
  const angle = useTransform(scrollYProgress, [0, 1], [-Math.PI / 2 - Math.PI / 3, -Math.PI / 2], { clamp: true })
  const minuteX = useTransform(angle, (a) => 600 + Math.cos(a) * 17)
  const minuteY = useTransform(angle, (a) => 150 + Math.sin(a) * 17)

  const ringBell = () => {
    bell()
    setRing((r) => r + 1)
  }

  return (
    <section ref={ref} aria-label="See you at 3:00" className="relative overflow-hidden">
      <p className="relative z-10 -rotate-2 text-center font-hand text-3xl text-clay sm:text-4xl">
        see you at 3:00 ♥
      </p>
      <div className="relative aspect-[4/3] w-full sm:aspect-[1200/520]">
        <SchoolScene onBell={ringBell} minuteX={minuteX} minuteY={minuteY} />
        {KIDS.map((k, i) => (
          <Kid key={i} kid={k} ringing={ring} />
        ))}
        <button
          onClick={ringBell}
          className="absolute top-[4%] left-1/2 hidden translate-x-[60%] -rotate-6 font-hand text-2xl text-cocoa sm:block"
        >
          ← ring the bell!
        </button>
        <p className="absolute bottom-[2%] left-1/2 -translate-x-1/2 rounded-full bg-cream/80 px-3 py-1 font-hand text-xl whitespace-nowrap text-cocoa">
          psst… click the kids
        </p>
      </div>
    </section>
  )
}
