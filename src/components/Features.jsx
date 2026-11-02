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
        <h3 className="title-card">{f.title}</h3>
        <p className="body-copy mt-2 text-cocoa">{f.body}</p>
      </div>
    </motion.article>
  )
}

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="page">
        <div className="section-head text-center">
          <p className="eyebrow rotate-[-2deg]">what’s inside</p>
          <h2 className="title-section mt-2">
            Little things that make pickup <span className="italic">feel easy.</span>
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 min-[1100px]:gap-10">
          {FEATURES.map((f, i) => (
            <Card key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
