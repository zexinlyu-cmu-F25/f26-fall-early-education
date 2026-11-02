import { motion } from 'motion/react'
import { JobsArt, LineupArt, MapArt, NotifyArt, RecordArt, TapArt } from './FeatureArt.jsx'

const FEATURES = [
  {
    title: 'Know where every child is',
    body: 'Zone-based tracking shows which room, club or field each student is in, updated live, so nobody has to go looking.',
    who: 'for teachers',
    color: '#DCE7E3',
    art: <MapArt />,
  },
  {
    title: 'Lined up and ready',
    body: 'Students join an organized lineup in the order their grown-ups arrive. No more shouting names across the yard.',
    who: 'for teachers & parents',
    color: '#FBDB94',
    art: <LineupArt />,
  },
  {
    title: 'One tap at the gate',
    body: 'Parents tap their phone or card on the NFC reader to check in. KidDash confirms they’re on the child’s pickup list.',
    who: 'for parents',
    color: '#FBC9BF',
    art: <TapArt />,
  },
  {
    title: 'A gentle heads-up',
    body: 'Teachers get a quiet notification when a parent arrives or a pickup plan changes, without interrupting class.',
    who: 'for teachers',
    color: '#D3E0D5',
    art: <NotifyArt />,
  },
  {
    title: 'Everyone has a job',
    body: 'Staff are assigned to the gate, the lineup or escorting kids, so every child always has someone looking out for them.',
    who: 'for school staff',
    color: '#F6E1D9',
    art: <JobsArt />,
  },
  {
    title: 'Every goodbye, recorded',
    body: 'Each handoff is logged: which child, which verified grown-up, and exactly when. No more paper sign-out sheets.',
    who: 'for schools',
    color: '#FCE3C8',
    art: <RecordArt />,
  },
]

function Card({ f, i }) {
  const tilt = [-1.5, 1, 1.2, -1, -1.2, 1.5][i]
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: (i % 2) * 0.08 }}
      className="flex flex-col overflow-hidden rounded-[1.75rem] border-[3px] border-ink shadow-[6px_7px_0_#3E322A]"
      style={{ background: f.color }}
    >
      <div className="px-6 pt-6 sm:px-8 sm:pt-8">{f.art}</div>
      <div className="mt-2 flex-1 border-t-[3px] border-ink bg-cream px-6 py-6 sm:px-8">
        <p className="font-hand text-xl text-clay">{f.who}</p>
        <h3 className="font-serif text-2xl leading-tight font-semibold sm:text-3xl">{f.title}</h3>
        <p className="mt-2 text-lg leading-snug text-cocoa">{f.body}</p>
      </div>
    </motion.article>
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
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Card key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
