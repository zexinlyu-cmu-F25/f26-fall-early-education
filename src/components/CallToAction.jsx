import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import Burst from './Burst.jsx'
import { chime } from '../lib/sound.js'
import { SIGNUP_ENDPOINT } from '../config.js'
import { track } from '../lib/analytics.js'

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

const field =
  'w-full rounded-full border-2 border-ink bg-cream px-6 py-4 text-lg text-ink placeholder:text-cocoa/50 focus:ring-4 focus:ring-honey focus:outline-none'

export default function CallToAction() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!SIGNUP_ENDPOINT) {
      console.warn('Sign-up form is not connected: set SIGNUP_ENDPOINT in src/config.js')
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      // sent as text/plain so the browser skips the CORS preflight Apps Script can't answer
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, email, source: 'landing-page' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(`Sign-up failed: ${data.error || res.status}`)
      chime()
      setStatus('done')
      track('generate_lead', { method: 'landing_page_form' })
    } catch (err) {
      console.error(err)
      setStatus('error')
      track('signup_error')
    }
  }

  return (
    <section id="contact" className="page scroll-mt-24 pt-8 pb-16">
      <div className="relative overflow-hidden rounded-[3rem] border-[3px] border-ink bg-clay px-6 py-14 text-center text-cream shadow-[10px_12px_0_#3E322A] sm:px-16 sm:py-20 min-[1600px]:py-28">
        <div className="absolute -top-24 -right-24 size-72 rounded-full border-[3px] border-ink bg-honey" />
        <div className="absolute -bottom-20 -left-16 size-56 rounded-full border-[3px] border-ink bg-blush" />
        <p className="eyebrow relative rotate-[-3deg] text-ink">make this experience your experience</p>
        <h2 className="title-display relative mt-3">
          Make 3:00 PM
          <br />
          <span className="italic">the calmest part of the day.</span>
        </h2>
        <p className="lead relative mx-auto mt-5 max-w-lg text-cream/90">
          We’re piloting KidDash with elementary schools. Leave your name and email and we’ll let you know when KidDash launches.
        </p>
        {status === 'done' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative mt-10">
            <Burst x="50%" y={0} />
            <p className="inline-block rotate-[-1deg] rounded-2xl border-2 border-ink bg-cream px-6 py-4 font-serif text-xl font-semibold text-ink shadow-[4px_4px_0_#3E322A]">
              Ding! Thanks, {name.split(' ')[0]}. We’ll write to {email} when KidDash launches.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} onFocus={() => status === 'idle' && !name && !email && track('signup_start')} className="relative mx-auto mt-10 flex max-w-lg flex-col gap-3">
            <label htmlFor="name" className="sr-only">Your name</label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={field}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className={`${field} flex-1`}
              />
              <MagneticButton
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full border-2 border-ink bg-honey px-8 py-4 text-lg font-bold text-ink shadow-[4px_4px_0_#3E322A] disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Sign up ♥'}
              </MagneticButton>
            </div>
            {status === 'error' && (
              <p role="alert" className="rounded-2xl border-2 border-ink bg-cream px-4 py-2 font-semibold text-ink">
                Hmm, that didn’t go through. Please try again in a moment.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
