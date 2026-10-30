import { motion } from 'motion/react'

const doodle = (children) => (
  <svg viewBox="0 0 64 64" className="size-20" fill="none" stroke="#3E322A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const STEPS = [
  {
    title: 'Tap in at the gate',
    body: 'The parent taps their phone or card on the NFC reader. KidDash checks them against the child’s pickup list.',
    note: 'that’s the reader you tapped',
    color: '#FBC9BF',
    icon: doodle(<><rect x="12" y="10" width="22" height="40" rx="5" fill="#FFFBF4" /><path d="M40 24a10 10 0 0 1 0 14M46 18a18 18 0 0 1 0 26" /></>),
  },
  {
    title: 'A gentle heads-up',
    body: 'The right teacher gets a quiet notification, and the student joins the lineup in the order parents arrive.',
    note: '“Maya, your dad’s here!”',
    color: '#FBDB94',
    icon: doodle(<><path d="M20 42V30a12 12 0 0 1 24 0v12l4 5H16z" fill="#F6C35A" /><path d="M28 52a4 4 0 0 0 8 0" /></>),
  },
  {
    title: 'A safe handoff, on record',
    body: 'Teachers release children only to verified grown-ups. Every handoff is saved: who picked up, who released, and when.',
    note: 'remember Jordan? not on the list, no handoff',
    color: '#D3E0D5',
    icon: doodle(<><path d="M14 12h28l8 8v32H14z" fill="#FFFBF4" /><path d="M22 28h20M22 36h20M22 44h12" /><path d="M44 46l4 4 8-10" stroke="#5F7F68" /></>),
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="rotate-[-2deg] font-hand text-3xl text-clay">what you just did</p>
          <h2 className="mt-2 font-serif text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl">
            Three steps. <span className="italic">Zero guesswork.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cocoa">
            The little game at the top is how every pickup works with KidDash.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <svg viewBox="0 0 1000 60" className="absolute top-14 left-[12%] hidden w-[76%] md:block" fill="none" aria-hidden="true">
            <path d="M0 30 Q125 0 250 30 T500 30 T750 30 T1000 30" stroke="#3E322A" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
          </svg>
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 160, damping: 18 }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative grid size-32 place-items-center rounded-full border-[3px] border-ink shadow-[4px_5px_0_#3E322A]"
                style={{ background: s.color }}
              >
                {s.icon}
                <span className="absolute -top-2 -right-2 grid size-10 place-items-center rounded-full border-2 border-ink bg-cream font-serif text-lg font-bold">
                  {i + 1}
                </span>
              </motion.div>
              <h3 className="mt-7 font-serif text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-xs text-cocoa">{s.body}</p>
              <p className="mt-3 -rotate-2 font-hand text-xl text-clay">↑ {s.note}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
