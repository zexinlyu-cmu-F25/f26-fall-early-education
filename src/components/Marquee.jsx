const items = ['tap in at the gate', 'a gentle heads-up', 'lined up & ready', 'plans change? no problem', 'every handoff, recorded', 'home safe']

export default function Marquee() {
  const row = [...items, ...items]
  return (
    // The strip is tilted, so the backdrop continues the hero's grass above it and the page paper below it.
    <div className="bg-linear-to-b from-[#7E9A84] from-50% to-paper to-50%">
      <div className="relative -ml-[2%] w-[104%] -rotate-1 overflow-hidden border-y-2 border-ink bg-honey py-3">
        <div className="marquee flex w-max gap-8 whitespace-nowrap">
          {[...row, ...row].map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-hand text-3xl text-ink">
              {t}
              <svg viewBox="0 0 24 24" className="size-5 text-clay" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 8 2.5C20 16.2 12 21 12 21z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
