import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import Burst from './Burst.jsx'
import { chime } from '../lib/sound.js'

function MagneticButton({ children, ...props }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 14 })
  const sy = useSpring(y, { stiffness: 220, damping: 14 })
  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.35)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default function CallToAction() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: send to a backend or form service once one is set up
    chime()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="scroll-mt-24 px-4 pt-8 pb-16 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border-[3px] border-ink bg-clay px-6 py-20 text-center text-cream shadow-[10px_12px_0_#3E322A] sm:px-16 sm:py-28">
        <div className="absolute -top-24 -right-24 size-72 rounded-full border-[3px] border-ink bg-honey" />
        <div className="absolute -bottom-20 -left-16 size-56 rounded-full border-[3px] border-ink bg-blush" />
        <p className="relative rotate-[-3deg] font-hand text-3xl text-ink">make this experience your experience</p>
        <h2 className="relative mt-3 font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] font-semibold tracking-tight">
          Make 3:00 PM
          <br />
          <span className="italic">the calmest part of the day.</span>
        </h2>
        <p className="relative mx-auto mt-6 max-w-lg text-lg text-cream/90">
          We’re piloting KidDash with elementary schools. Sign up and we’ll show you around.
        </p>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative mt-10">
            <Burst x="50%" y={0} />
            <p className="inline-block rotate-[-1deg] rounded-2xl border-2 border-ink bg-cream px-6 py-4 font-serif text-xl font-semibold text-ink shadow-[4px_4px_0_#3E322A]">
              Ding! You’re on the list. We’ll write to {email}.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              className="flex-1 rounded-full border-2 border-ink bg-cream px-6 py-4 text-lg text-ink placeholder:text-cocoa/50 focus:ring-4 focus:ring-honey focus:outline-none"
            />
            <MagneticButton type="submit" className="rounded-full border-2 border-ink bg-honey px-8 py-4 text-lg font-bold text-ink shadow-[4px_4px_0_#3E322A]">
              Sign up ♥
            </MagneticButton>
          </form>
        )}
      </div>
    </section>
  )
}
