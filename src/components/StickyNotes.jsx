import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { chime } from '../lib/sound.js'

const NOTES = [
  { text: 'Who’s picking up Sofia today??', x: '8%', y: '10%', r: -6, c: '#FBDB94' },
  { text: 'Is Ethan in the gym or the library?', x: '50%', y: '6%', r: 5, c: '#FBC9BF' },
  { text: 'Grandma’s coming. TELL MS. CHEN!', x: '28%', y: '34%', r: -2, c: '#D3E0D5' },
  { text: 'Lane 3 backed up again…', x: '60%', y: '40%', r: 7, c: '#DCE7E3' },
  { text: 'Sign-out sheet: missing signature', x: '6%', y: '58%', r: 4, c: '#FBDB94' },
  { text: 'Noah left with… who?', x: '44%', y: '64%', r: -7, c: '#FBC9BF' },
]

const PAINS = [
  ['Teachers get interrupted', 'Calls, radios and shouted names pull them away from the kids in front of them.'],
  ['Kids are hard to find', 'Students are spread across rooms, clubs and the gym.'],
  ['Plans change last minute', 'A note or a phone call rarely reaches the right teacher in time.'],
  ['No record of the handoff', 'Nobody can say for sure who picked up which child, or when.'],
]

export default function StickyNotes() {
  const board = useRef(null)
  const [cleared, setCleared] = useState(() => new Set())
  const allClear = cleared.size === NOTES.length

  const onDragEnd = (i, info) => {
    if (cleared.has(i) || Math.hypot(info.offset.x, info.offset.y) < 110) return
    const next = new Set(cleared).add(i)
    setCleared(next)
    if (next.size === NOTES.length) chime()
  }

  return (
    <section id="problem" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="-rotate-2 font-hand text-3xl text-clay">why we built it</p>
          <h2 className="mt-2 font-serif text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl">
            Right now, dismissal runs on <span className="italic">sticky notes.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-cocoa">
            Without real-time information or organized records, pickup means delays, confusion, and a real risk of a
            child going home with the wrong person.
          </p>
          <ul className="mt-8 space-y-4">
            {PAINS.map(([t, b]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 size-3 shrink-0 rotate-45 rounded-[3px] bg-clay" />
                <p>
                  <b className="font-bold">{t}.</b> <span className="text-cocoa">{b}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div ref={board} className="cork relative aspect-[5/4] rounded-[1.5rem] border-[10px] border-[#A9744A] shadow-[6px_8px_0_#3E322A]">
            <AnimatePresence>
              {allClear && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 grid place-items-center p-6 text-center"
                >
                  <div className="rotate-[-2deg] rounded-2xl border-2 border-ink bg-cream px-6 py-5 shadow-[4px_4px_0_#3E322A]">
                    <p className="font-hand text-3xl text-clay">ahh, that’s better.</p>
                    <p className="mt-1 font-serif text-xl font-semibold">This is 3:00 PM with KidDash.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {NOTES.map((n, i) => (
              <motion.div
                key={n.text}
                drag
                dragConstraints={board}
                dragElastic={0.6}
                onDragEnd={(_, info) => onDragEnd(i, info)}
                whileHover={{ scale: 1.04, rotate: 0 }}
                whileDrag={{ scale: 1.1, rotate: n.r * 2, zIndex: 20, boxShadow: '10px 14px 0 rgba(58,42,31,.35)' }}
                animate={cleared.has(i) ? { opacity: 0.0, scale: 0.6 } : { opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="absolute w-[38%] cursor-grab touch-none p-3 font-hand text-[clamp(1.1rem,2.2vw,1.6rem)] leading-tight shadow-[3px_4px_0_rgba(58,42,31,.25)] active:cursor-grabbing sm:p-4"
                style={{ left: n.x, top: n.y, rotate: n.r, background: n.c, pointerEvents: cleared.has(i) ? 'none' : 'auto' }}
              >
                <span className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full border-2 border-ink bg-clay" />
                {n.text}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-center font-hand text-2xl text-cocoa">
            {allClear ? 'all clear ✓' : `toss the worries away · ${cleared.size}/${NOTES.length}`}
          </p>
        </div>
      </div>
    </section>
  )
}
