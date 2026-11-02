import { motion } from 'motion/react'
import { VIDEO_URL } from '../config.js'
import { track } from '../lib/analytics.js'

// turn a normal YouTube/Vimeo link into its embeddable player URL
function embedUrl(url) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?enablejsapi=1`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return null
}

export default function VideoSection() {
  const src = VIDEO_URL && embedUrl(VIDEO_URL)

  return (
    <section id="video" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="rotate-[-2deg] font-hand text-3xl text-clay">two minutes, two afternoons</p>
          <h2 className="mt-2 font-serif text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl">
            Pickup, <span className="italic">before</span> and <span className="italic">after</span> KidDash.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cocoa">
            Follow one family through the same school day twice: once with phone calls and sign-out sheets, once with a single tap at the gate.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => track('video_section_view')}
          transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          className="relative mt-14 aspect-video overflow-hidden rounded-[2rem] border-[3px] border-ink bg-cream shadow-[8px_8px_0_#3E322A]"
        >
          {src ? (
            <iframe
              src={src}
              title="KidDash Before/After concept video"
              className="absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="grid place-items-center border-r-[3px] border-dashed border-ink/30 bg-[#FBC9BF]/60 p-6 text-center">
                <div>
                  <p className="font-hand text-3xl text-[#8E4639]">before</p>
                  <p className="mt-1 text-sm font-semibold text-cocoa sm:text-base">calls, radios, a paper sign-out sheet</p>
                </div>
              </div>
              <div className="grid place-items-center bg-[#D3E0D5]/70 p-6 text-center">
                <div>
                  <p className="font-hand text-3xl text-[#3F5A47]">after</p>
                  <p className="mt-1 text-sm font-semibold text-cocoa sm:text-base">one tap, one ding, one record</p>
                </div>
              </div>
              <p className="absolute top-1/2 left-1/2 -translate-1/2 rotate-[-3deg] rounded-full border-2 border-ink bg-honey px-5 py-2 font-bold whitespace-nowrap shadow-[3px_3px_0_#3E322A]">
                ▶ video coming soon
              </p>
            </div>
          )}
        </motion.div>

        {VIDEO_URL && (
          <p className="mt-6 text-center">
            <a href={VIDEO_URL} target="_blank" rel="noreferrer" onClick={() => track('video_open')} className="font-semibold text-clay underline decoration-2 underline-offset-4 hover:text-ink">
              Open the video in a new tab ↗
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
