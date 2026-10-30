import { useState } from 'react'
import { motion } from 'motion/react'
import { boop } from '../lib/sound.js'

const doodle = (children) => (
  <svg viewBox="0 0 64 64" className="size-24" fill="none" stroke="#3E322A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const FEATURES = [
  {
    title: 'Know where every child is',
    back: 'Zone-based tracking shows which room, club or field each student is in, updated live.',
    color: '#DCE7E3',
    icon: doodle(<><path d="M32 56s-16-14-16-27a16 16 0 0 1 32 0c0 13-16 27-16 27z" fill="#DE7462" /><circle cx="32" cy="29" r="6" fill="#FFFBF4" /></>),
  },
  {
    title: 'Lined up and ready',
    back: 'Students join an organized lineup in the order their grown-ups arrive. No more calling names.',
    color: '#FBDB94',
    icon: doodle(<>{[14, 32, 50].map((x, i) => <g key={x}><circle cx={x} cy="24" r="7" fill={['#F79A8B', '#A9C4C2', '#5F7F68'][i]} /><path d={`M${x - 8} 48 q8 -16 16 0`} /></g>)}</>),
  },
  {
    title: 'One tap at the gate',
    back: 'Parents tap their phone or card on an NFC reader to check in, and again to confirm pickup.',
    color: '#FBC9BF',
    icon: doodle(<><rect x="12" y="10" width="22" height="40" rx="5" fill="#FFFBF4" /><path d="M40 24a10 10 0 0 1 0 14M46 18a18 18 0 0 1 0 26" /></>),
  },
  {
    title: 'A gentle heads-up',
    back: 'Teachers get a quiet notification when a parent arrives or a pickup plan changes, without interrupting class.',
    color: '#D3E0D5',
    icon: doodle(<><path d="M20 42V30a12 12 0 0 1 24 0v12l4 5H16z" fill="#F6C35A" /><path d="M28 52a4 4 0 0 0 8 0" /></>),
  },
  {
    title: 'Everyone has a job',
    back: 'Task delegation assigns staff to zones and escorts, so every child always has someone looking out for them.',
    color: '#F6E1D9',
    icon: doodle(<><rect x="14" y="10" width="36" height="46" rx="5" fill="#FFFBF4" /><path d="M22 26l4 4 8-8M22 42l4 4 8-8M40 28h4M40 44h4" /></>),
  },
  {
    title: 'Every goodbye, recorded',
    back: 'Digital handoff records log who picked up, who released, and exactly when.',
    color: '#FCE3C8',
    icon: doodle(<><path d="M14 12h28l8 8v32H14z" fill="#FFFBF4" /><path d="M22 28h20M22 36h20M22 44h12" /><path d="M44 46l4 4 8-10" stroke="#5F7F68" /></>),
  },
]

function Card({ f, i }) {
  const [flipped, setFlipped] = useState(false)
  const tilt = [-3, 2, -1.5, 3, -2.5, 1.5][i]
  return (
    <motion.button
      onClick={() => {
        boop()
        setFlipped(!flipped)
      }}
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: (i % 3) * 0.08 }}
      className="group relative h-80 cursor-pointer text-left [perspective:1200px]"
      aria-pressed={flipped}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border-[3px] border-ink p-6 shadow-[5px_6px_0_#3E322A] [backface-visibility:hidden]"
          style={{ background: f.color }}
        >
          <span className="transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">{f.icon}</span>
          <div>
            <h3 className="font-serif text-2xl leading-tight font-semibold">{f.title}</h3>
            <p className="mt-2 font-hand text-xl text-cocoa">tap to flip ↻</p>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center rounded-[1.75rem] border-[3px] border-ink bg-cream p-6 shadow-[5px_6px_0_#3E322A] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="font-serif text-lg font-semibold text-clay">{f.title}</h3>
          <p className="mt-3 text-lg leading-snug">{f.back}</p>
        </div>
      </motion.div>
    </motion.button>
  )
}

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="rotate-[-2deg] font-hand text-3xl text-clay">what’s inside</p>
          <h2 className="mt-2 font-serif text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl">
            Little things that make pickup <span className="italic">feel easy.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Card key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
