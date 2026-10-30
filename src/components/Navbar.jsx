import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './Logo.jsx'

const links = [
  { href: '#handoff', label: 'Try it' },
  { href: '#problem', label: 'Why' },
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#audience', label: 'For you' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border-2 border-ink bg-cream/90 pr-2 pl-4 shadow-[4px_4px_0_#3E322A] backdrop-blur">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-cocoa transition hover:bg-honey/30 hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden rounded-full border-2 border-ink bg-clay px-5 py-2 font-bold text-cream transition hover:-translate-y-0.5 hover:shadow-[0_3px_0_#3E322A] sm:block">
            Sign up
          </a>
          <button
            className="grid size-11 place-items-center rounded-full md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
            </svg>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-3 max-w-5xl rounded-3xl border-2 border-ink bg-cream p-3 shadow-[4px_4px_0_#3E322A] md:hidden"
          >
            {[...links, { href: '#contact', label: 'Sign up' }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-semibold hover:bg-honey/30">
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
