import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Person from './Person.jsx'

const MODES = {
  teacher: {
    label: 'I’m a teacher',
    headline: 'Run dismissal without dropping what you’re doing.',
    points: ['See every student’s zone at a glance', 'A gentle ping the moment a parent arrives', 'Clear tasks for every staff member', 'No more radios or shouting names'],
    person: { hairStyle: 'bun', hair: '#2E2320', skin: '#F3D2B5', shirt: '#5F7F68', pants: '#5C4A3D', glasses: true, badge: true },
    bg: '#D3E0D5',
  },
  parent: {
    label: 'I’m a parent',
    headline: 'A faster, safer pickup, every single day.',
    points: ['Tap in at the gate, with no front-desk line', 'Change today’s plan from your phone', 'Your child is ready when you arrive', 'A little “ding” when the handoff is done'],
    person: { hairStyle: 'short', hair: '#3E322A', skin: '#D9A27E', shirt: '#A9C4C2', pants: '#5A6260', phone: true },
    bg: '#DCE7E3',
  },
}

export default function Audience() {
  const [mode, setMode] = useState('teacher')
  const m = MODES[mode]

  return (
    <section id="audience" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border-2 border-ink bg-cream p-1.5 shadow-[3px_3px_0_#3E322A]">
            {Object.entries(MODES).map(([key, v]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`relative rounded-full px-5 py-2.5 font-bold transition-colors sm:px-7 ${mode === key ? 'text-cream' : 'text-cocoa hover:text-ink'}`}
              >
                {mode === key && <motion.span layoutId="audience-pill" className="absolute inset-0 rounded-full bg-clay" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="mt-14 grid items-center gap-10 rounded-[2.5rem] border-[3px] border-ink p-8 shadow-[8px_8px_0_#3E322A] sm:p-12 lg:grid-cols-[1fr_auto]"
            style={{ background: m.bg }}
          >
            <div>
              <h3 className="font-serif text-4xl leading-tight font-semibold sm:text-5xl">{m.headline}</h3>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {m.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-3 rounded-2xl border-2 border-ink bg-cream px-4 py-3 font-semibold"
                  >
                    <span className="text-clay">♥</span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ rotate: -8, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="mx-auto w-36 sm:w-44">
              <Person {...m.person} mood="happy" right={[112, 50]} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
