import { useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue } from 'motion/react'
import Person from './Person.jsx'
import Burst from './Burst.jsx'
import { boop, ding, nope } from '../lib/sound.js'

const spring = { type: 'spring', stiffness: 160, damping: 18 }
const START_LINE = { who: 'teacher', text: 'Maya’s all packed up! Who’s here for her today?' }

const TEACHER = { hairStyle: 'bun', hair: '#2E2320', skin: '#F3D2B5', shirt: '#5F7F68', pants: '#5C4A3D', glasses: true, badge: true }
const MAYA = { kid: true, hairStyle: 'pigtails', hair: '#6B3E26', skin: '#E8B48F', shirt: '#F6C35A', pants: '#DE7462' }
const DAD = { hairStyle: 'short', hair: '#3E322A', skin: '#D9A27E', shirt: '#A9C4C2', pants: '#5A6260', phone: true }
const JORDAN = { hairStyle: 'curly', hair: '#2B1D17', skin: '#8D5A3B', shirt: '#D9A79B', pants: '#554B4A' }

function Bubble({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`absolute z-20 w-[min(15rem,44vw)] rounded-2xl border-2 border-ink bg-cream px-3 py-2 font-hand text-[clamp(1.05rem,1.8vw,1.45rem)] leading-tight shadow-[3px_3px_0_#3E322A] ${className}`}
    >
      {children}
    </motion.div>
  )
}

function Tag({ name, role, ok, hidden = false }) {
  return (
    <div className={`mt-1.5 shrink-0 text-center leading-tight transition-opacity ${hidden ? 'opacity-0' : ''}`}>
      <p className="font-serif text-[clamp(0.8rem,1.4vw,1.05rem)] font-semibold">{name}</p>
      <p className="hidden text-[clamp(0.65rem,1.1vw,0.8rem)] text-cocoa sm:block">{role}</p>
      {ok !== undefined && (
        <p className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[clamp(0.6rem,1vw,0.72rem)] font-bold ${ok ? 'bg-sage/30 text-[#3F5A47]' : 'bg-blush/50 text-[#8E4639]'}`}>
          {ok ? '✓ ' : '✕ '}
          <span className="hidden sm:inline">{ok ? 'on Maya’s pickup list' : 'not on Maya’s list'}</span>
          <span className="sm:hidden">{ok ? 'on list' : 'not on list'}</span>
        </p>
      )}
    </div>
  )
}

export default function Handoff() {
  const stage = useRef(null)
  const mayaRef = useRef(null)
  const dadRef = useRef(null)
  const jordanRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const [phase, setPhase] = useState('waiting') // waiting → arrived → done
  const [tapping, setTapping] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [hover, setHover] = useState(null)
  const [say, setSay] = useState(START_LINE)
  const [shake, setShake] = useState(0)
  const [burst, setBurst] = useState(null)

  const hit = (e) => {
    for (const [name, ref] of [['dad', dadRef], ['jordan', jordanRef]]) {
      const r = ref.current.getBoundingClientRect()
      if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top - 40 && e.clientY < r.bottom) return name
    }
    return null
  }

  const goBack = () => {
    animate(mx, 0, spring)
    animate(my, 0, spring)
  }

  const tapIn = () => {
    if (phase !== 'waiting') return
    setTapping(true)
    boop()
    setTimeout(() => {
      ding()
      setTapping(false)
      setPhase('arrived')
      setSay({ who: 'teacher', text: 'Ding! Maya, your dad’s here. Off you go!' })
    }, 550)
  }

  const onDrop = (e) => {
    setDragging(false)
    setHover(null)
    const target = hit(e)

    if (target === 'dad' && phase === 'arrived') {
      const s = stage.current.getBoundingClientRect()
      const m = mayaRef.current.getBoundingClientRect()
      const d = dadRef.current.getBoundingClientRect()
      animate(mx, mx.get() + (d.left + d.width * 0.78) - (m.left + m.width / 2), spring)
      animate(my, 0, spring)
      setPhase('done')
      setSay(null)
      setBurst({ key: Date.now(), x: d.left - s.left + d.width / 2, y: d.top - s.top + d.height * 0.25 })
      ding()
      return
    }

    goBack()
    if (target === 'dad') {
      nope()
      setSay({ who: 'teacher', text: 'Hold on! Daniel needs to tap in at the gate first.' })
    } else if (target === 'jordan') {
      nope()
      setShake((n) => n + 1)
      setSay({ who: 'jordan', text: 'Oh! I’m here for Noah. I’m not on Maya’s list.' })
    }
  }

  const reset = () => {
    setPhase('waiting')
    setSay(START_LINE)
    setBurst(null)
    mx.set(0)
    my.set(0)
  }

  const current = phase === 'waiting' ? 0 : phase === 'arrived' ? 1 : 2
  const steps = [
    ['Tap Daniel’s phone at the gate', phase !== 'waiting'],
    ['Walk Maya over to her dad', phase === 'done'],
    ['Ding! Handoff recorded', phase === 'done'],
  ]

  const dadArms =
    phase === 'done'
      ? { left: [60, 130], right: [124, 128] }
      : tapping
        ? { left: [-26, 120] }
        : dragging && hover === 'dad' && phase === 'arrived'
          ? { left: [-4, 70], right: [124, 70] }
          : phase === 'arrived'
            ? { left: [12, 120], right: [108, 120] }
            : {}

  const bubble = (who, side) => (
    <AnimatePresence mode="wait">
      {say?.who === who && (
        <Bubble key={say.text} className={`bottom-[calc(100%+0.5rem)] ${side === 'left' ? 'left-0 rounded-bl-sm' : 'right-0 rounded-br-sm'}`}>
          {say.text}
        </Bubble>
      )}
    </AnimatePresence>
  )

  return (
    <section
      id="handoff"
      className="relative isolate h-svh min-h-[40rem] overflow-hidden bg-linear-to-b from-[#DCE7E3] via-[#F6E6D6] to-[#FCE3C8] select-none"
    >
      <Backdrop />

      {/* headline floats in the sky */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 text-center sm:pt-28">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rotate-[-2deg] font-hand text-xl text-clay sm:text-2xl">
          it’s 3:14 PM at Lincoln Elementary…
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-serif text-[clamp(2.1rem,4.8vw,4rem)] leading-[1] font-semibold tracking-[-0.02em]"
        >
          Every child, into the{' '}
          <span className="relative inline-block italic text-clay">
            right arms.
            <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M4 14 Q80 2 150 10 T296 8"
                stroke="#F6C35A"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </svg>
          </span>
        </motion.h1>
        <ol className="mt-6 flex justify-center gap-1.5 whitespace-nowrap">
          {steps.map(([label, done], i) => (
            <li
              key={label}
              className={`flex items-center gap-1.5 rounded-full border-2 px-2 py-1 text-xs font-bold transition-colors sm:px-3 sm:text-sm ${done ? 'border-ink bg-sage text-cream' : i === current ? 'border-ink bg-cream text-ink' : 'border-ink/20 bg-cream/60 text-cocoa'}`}
            >
              <span className={`grid size-5 place-items-center rounded-full text-[11px] ${done ? 'bg-cream text-sage' : 'bg-ink/10'}`}>{done ? '✓' : i + 1}</span>
              <span className={i === current ? '' : 'hidden lg:inline'}>{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[28%] w-full" aria-hidden="true">
        <path d="M-10 40 Q250 0 500 30 T1010 20 V210 H-10Z" fill="#7E9A84" stroke="#3E322A" strokeWidth="3" />
      </svg>

      {/* the playable scene, kept to a readable width on very wide screens */}
      <div ref={stage} className="absolute inset-0 mx-auto max-w-7xl">
        {/* the school gate with its NFC reader */}
        <div className="absolute bottom-[22%] left-[37%] flex h-[24%] w-[14%] items-end justify-between sm:left-[38%] sm:w-[17%]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-full w-[10%] rounded-t-full border-2 border-ink bg-cream" />
          ))}
          <span className="absolute top-[30%] left-0 h-[8%] w-full rounded-full border-2 border-ink bg-cream" />
        </div>
        <div className="absolute bottom-[22%] left-[49%] flex h-[30%] w-[8%] flex-col items-center sm:left-[52%] sm:w-[6%]">
          <button
            onClick={tapIn}
            disabled={phase !== 'waiting'}
            aria-label="Tap Daniel’s phone on the NFC reader"
            className="relative grid aspect-square w-[clamp(2.6rem,5vw,4rem)] place-items-center rounded-2xl border-2 border-ink bg-clay text-cream shadow-[3px_3px_0_#3E322A] transition enabled:cursor-pointer enabled:hover:-translate-y-0.5 disabled:bg-sage"
          >
            {phase === 'waiting' && (
              <>
                <span className="ring absolute inset-0 rounded-2xl border-2 border-clay" />
                <span className="ring absolute inset-0 rounded-2xl border-2 border-clay [animation-delay:1s]" />
              </>
            )}
            {phase === 'waiting' ? (
              <svg viewBox="0 0 24 24" className="w-1/2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <circle cx="7" cy="12" r="1.6" fill="currentColor" stroke="none" />
                <path d="M10.5 8.5a5 5 0 0 1 0 7M14 6a8.5 8.5 0 0 1 0 12M17.5 3.5a12 12 0 0 1 0 17" />
              </svg>
            ) : (
              <span className="text-xl font-black">✓</span>
            )}
          </button>
          <span className="w-[22%] flex-1 border-x-2 border-ink bg-[#A9744A]" />
        </div>

        {/* people */}
        <div className="absolute bottom-[3%] left-[1%] flex h-[42%] w-[21%] sm:h-[50%] flex-col items-center sm:left-[3%] sm:w-[17%]">
          {bubble('teacher', 'left')}
          <Person {...TEACHER} className="min-h-0 w-full flex-1" mood={phase === 'done' ? 'happy' : 'normal'} right={phase === 'done' ? [112, 40] : [118, 150]} />
          <Tag name="Ms. Chen" role="2nd grade teacher" />
        </div>

        <motion.div
          ref={mayaRef}
          drag={phase !== 'done'}
          dragMomentum={false}
          style={{ x: mx, y: my }}
          onDragStart={() => {
            setDragging(true)
            boop()
            if (phase === 'waiting') setSay({ who: 'teacher', text: 'Wait! Nobody’s checked in for Maya yet.' })
          }}
          onDrag={(e) => setHover(hit(e))}
          onDragEnd={onDrop}
          whileDrag={{ scale: 1.08, rotate: -4 }}
          className={`absolute bottom-[3%] left-[21%] z-10 flex h-[32%] w-[14%] sm:h-[38%] touch-none flex-col items-center sm:left-[19.5%] sm:w-[11%] ${phase === 'done' ? '' : 'cursor-grab active:cursor-grabbing'}`}
        >
          <Person
            {...MAYA}
            className="min-h-0 w-full flex-1"
            mood={phase === 'waiting' && !dragging ? 'normal' : 'happy'}
            left={phase === 'done' ? [-6, 96] : dragging ? [22, 52] : [8, 128]}
            right={dragging ? [98, 52] : undefined}
          />
          <Tag name="Maya L." role="Grade 2" hidden={phase === 'done'} />
        </motion.div>

        <div ref={dadRef} className="absolute bottom-[3%] left-[57%] flex h-[42%] w-[20%] sm:h-[50%] flex-col items-center sm:left-[61%] sm:w-[16%]">
          <AnimatePresence>
            {dragging && phase === 'arrived' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: hover === 'dad' ? 1.1 : 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-x-[10%] top-[-4%] bottom-[18%] rounded-[50%] border-[3px] border-dashed border-sage bg-sage/15"
              />
            )}
          </AnimatePresence>
          <Person {...DAD} className="relative min-h-0 w-full flex-1" mood={phase === 'waiting' ? 'normal' : 'happy'} {...dadArms} />
          <Tag name="Daniel Lee" role="Maya’s dad" ok />
        </div>

        <motion.div
          ref={jordanRef}
          key={shake}
          animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="absolute bottom-[3%] left-[79%] flex h-[42%] w-[20%] sm:h-[50%] flex-col items-center sm:left-[81%] sm:w-[16%]"
        >
          {bubble('jordan', 'right')}
          <Person {...JORDAN} className="min-h-0 w-full flex-1" mood={say?.who === 'jordan' ? 'oops' : 'normal'} />
          <Tag name="Jordan K." role="Noah’s mom" ok={false} />
        </motion.div>

        {phase === 'waiting' && !dragging && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ y: { repeat: Infinity, duration: 1.6 }, delay: 0.6 }}
            className="pointer-events-none absolute bottom-[50%] left-[35%] hidden -rotate-6 rounded-full border-2 border-clay bg-cream/90 px-4 py-1 font-hand text-[1.9rem] leading-none font-bold text-clay shadow-[2px_2px_0_#DE7462] sm:block"
          >
            1. tap the reader →
          </motion.p>
        )}
        {phase === 'arrived' && !dragging && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 8, 0] }}
            transition={{ x: { repeat: Infinity, duration: 1.4 } }}
            className="pointer-events-none absolute right-[2%] bottom-[56%] z-20 -rotate-3 rounded-full border-2 border-clay bg-cream/90 px-3 py-1 font-hand text-xl leading-none font-bold text-clay shadow-[2px_2px_0_#DE7462] sm:right-auto sm:bottom-[12%] sm:left-[30%] sm:px-4 sm:text-[2rem]"
          >
            2. drag Maya to her dad →
          </motion.p>
        )}

        {burst && <Burst key={burst.key} x={burst.x} y={burst.y} />}

        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 18 }}
              className="absolute inset-x-4 top-28 z-40 mx-auto max-w-md rounded-3xl border-[3px] border-ink bg-cream p-5 shadow-[6px_6px_0_#3E322A] sm:top-auto sm:right-auto sm:bottom-[7%] sm:left-[22%] sm:mx-0 sm:w-[38%] sm:p-7"
            >
              <p className="font-hand text-3xl text-clay">ding!</p>
              <p className="font-serif text-2xl leading-tight font-semibold sm:text-3xl">Maya is home safe with her dad.</p>
              <p className="short-only mt-2 text-sm font-bold text-cocoa sm:hidden">Daniel Lee · NFC ✓ · 3:14 PM · record saved</p>
              <dl className="tall-only mt-4 hidden grid-cols-2 gap-x-4 gap-y-1 rounded-2xl border-2 border-dashed border-ink/30 p-3 text-sm sm:grid">
                <dt className="text-cocoa">Picked up by</dt>
                <dd className="text-right font-bold">Daniel Lee · NFC ✓</dd>
                <dt className="text-cocoa">Released by</dt>
                <dd className="text-right font-bold">Ms. Chen</dd>
                <dt className="text-cocoa">Time</dt>
                <dd className="text-right font-bold">3:14 PM</dd>
                <dt className="text-cocoa">Record</dt>
                <dd className="text-right font-bold">saved ✓</dd>
              </dl>
              <p className="mt-4 font-serif text-lg italic sm:mt-5">Make this experience your experience.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="#contact" className="flex-1 rounded-full border-2 border-ink bg-clay px-5 py-3 text-center font-bold text-cream shadow-[3px_3px_0_#3E322A] transition hover:-translate-y-0.5">
                  Sign up →
                </a>
                <button onClick={reset} className="rounded-full border-2 border-ink px-5 py-3 font-bold transition hover:bg-honey/30">
                  ↺ Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <a href="#problem" className="absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 font-hand text-xl text-ink/70 transition hover:text-clay sm:block">
        why it matters ↓
      </a>
    </section>
  )
}

// Sky, sun, clouds and a little school on the far hill, behind the gate.
function Backdrop() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 -z-10 h-full w-full" aria-hidden="true">
      <g stroke="#3E322A" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="1310" cy="320" r="88" fill="#F6C35A" fillOpacity="0.22" stroke="none" />
        <circle cx="1310" cy="320" r="54" fill="#F6C35A" />
        <g className="drift" fill="#FFFBF4">
          <path d="M50 330 q10 -34 46 -24 q18 -30 52 -10 q34 -6 34 28 q0 18 -24 18 h-96 q-26 0 -12 -12z" />
          <path d="M1240 190 q8 -24 34 -18 q14 -22 40 -6 q24 -4 24 20 q0 13 -18 13 h-70 q-20 0 -10 -9z" />
        </g>
        <path d="M-10 610 Q260 530 560 580 T1100 560 T1450 570 V910 H-10Z" fill="#B5C8B8" filter="url(#rough)" />
        <g filter="url(#rough)">
          <rect x="232" y="520" width="14" height="80" fill="#8A5A3C" />
          <circle cx="239" cy="505" r="40" fill="#5F7F68" />
          <circle cx="212" cy="528" r="26" fill="#5F7F68" />
          <rect x="1222" y="520" width="14" height="70" fill="#8A5A3C" />
          <circle cx="1229" cy="508" r="36" fill="#86A08C" />
        </g>
        <g className="max-sm:hidden">
          <polygon points="288,500 390,452 492,500" fill="#C25F4E" />
          <rect x="302" y="498" width="176" height="86" fill="#F79A8B" />
          {[330, 370, 410, 450].map((x) => (
            <rect key={x} x={x - 11} y="514" width="22" height="22" rx="3" fill="#DCE7E3" strokeWidth="2.5" />
          ))}
          <path d="M378 584 V556 Q390 542 402 556 V584 Z" fill="#7A4B35" strokeWidth="2.5" />
          <rect x="374" y="420" width="32" height="44" fill="#FFFBF4" strokeWidth="2.5" />
          <polygon points="368,422 390,396 412,422" fill="#C25F4E" strokeWidth="2.5" />
          <circle cx="390" cy="442" r="9" fill="#FFFBF4" strokeWidth="2" />
          <path d="M390 442 V436 M390 442 H395" strokeWidth="2" />
        </g>
      </g>
    </svg>
  )
}
