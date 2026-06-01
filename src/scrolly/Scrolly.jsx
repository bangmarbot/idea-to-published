import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

const STEPS = [
  {
    n: '01',
    tag: 'Define Requirements',
    sub: "The one step AI can't do for you.",
    accent: '#8b6bff',
    bullets: [
      'What are you building?',
      'Why does it need to exist?',
      'Who is it for?',
      'What does success look like?',
    ],
    role: '🧠 You think · AI waits',
  },
  {
    n: '02',
    tag: 'Choose Your Stack',
    sub: 'Pick your tools by one question.',
    accent: '#4dd4ff',
    bullets: [
      '“Does it need to store data or log users in?”',
      'No → static stack (Astro + Tailwind)',
      'Yes → add a backend (Supabase)',
      'Start at Astro · climb to Next.js only if needed',
    ],
    role: '🤝 AI advises · You choose',
  },
  {
    n: '03',
    tag: 'Design',
    sub: 'Lock the look before building.',
    accent: '#46f6b4',
    bullets: [
      'Figma mockup — most polished',
      'Prototype tool — fast exploring',
      'Design-in-code — fastest',
      'Lock color · font · layout = brand kit',
    ],
    role: '🎨 AI renders · You curate',
  },
  {
    n: '04',
    tag: 'Build',
    sub: 'Let AI write the code — stay in the loop.',
    accent: '#ffb36b',
    bullets: [
      'Review in small chunks, not one dump',
      'Content first, polish second',
      'New version each time — never overwrite',
    ],
    role: '⚙️ AI types · You judge',
  },
  {
    n: '05',
    tag: 'Deploy',
    sub: "Two places — don't confuse them.",
    accent: '#ff6bd0',
    bullets: [
      'GitHub = where your code lives',
      'Hosting = where the app lives for visitors',
      'code → push → host publishes → live',
      'Authorize once · ships automatically',
    ],
    role: '🚀 You authorize · AI ships',
  },
  {
    n: '06',
    tag: 'Post-Publish',
    sub: 'The start line, not the finish.',
    accent: '#7c5cff',
    bullets: [
      'Analytics — who visits, doing what',
      'Check mobile + speed',
      'Iterate — read the data, fix, repeat',
    ],
    role: '📈 AI builds · You learn & loop',
  },
]

const ACCENTS = STEPS.map((s) => s.accent)
const STOPS = STEPS.map((_, i) => (STEPS.length === 1 ? 0 : i / (STEPS.length - 1)))

/* ---------- intro ---------- */
function Intro() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase sm:text-sm sm:tracking-widest"
      >
        Scroll-driven edition
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 text-5xl font-bold leading-[1.05] sm:text-7xl"
      >
        From Idea to <span className="text-gradient">Published</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-6 max-w-md text-lg text-white/65"
      >
        Don't read it — <span className="text-white">scroll</span> it. Six decisions, one
        moving pipeline.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono text-xs">scroll to begin</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}

/* ---------- the pinned scrollytelling stage ---------- */
function Stage() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // continuous fill for the rail
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  // morphing background tint
  const bg = useTransform(scrollYProgress, STOPS, ACCENTS)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))
    if (i !== active) setActive(i)
  })

  const s = STEPS[active]

  return (
    <section ref={ref} style={{ height: `${(STEPS.length + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden sm:flex-row">
        {/* morphing glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10 h-[80vh] w-[80vh] rounded-full opacity-25 blur-[130px]"
          style={{ backgroundColor: bg, top: '10%', left: '20%' }}
        />

        {/* ---- vertical rail (desktop) ---- */}
        <div className="hidden w-[38%] items-center justify-center sm:flex">
          <div className="relative flex h-[60vh] gap-6">
            {/* track */}
            <div className="relative w-[3px] rounded-full bg-white/10">
              <motion.div
                className="absolute left-0 top-0 w-full rounded-full"
                style={{ height: fill, background: 'linear-gradient(#8b6bff,#4dd4ff,#46f6b4,#ffb36b,#ff6bd0,#7c5cff)' }}
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              {STEPS.map((st, i) => {
                const on = i <= active
                const cur = i === active
                return (
                  <button
                    key={st.n}
                    onClick={() =>
                      ref.current?.scrollIntoView
                        ? window.scrollTo({
                            top: ref.current.offsetTop + (i + 0.5) * (ref.current.offsetHeight / (STEPS.length + 1)),
                            behavior: 'smooth',
                          })
                        : null
                    }
                    className="group flex items-center gap-3 text-left"
                  >
                    <motion.span
                      animate={{
                        scale: cur ? 1.25 : 1,
                        backgroundColor: on ? st.accent : 'rgba(255,255,255,0.15)',
                        boxShadow: cur ? `0 0 22px ${st.accent}` : '0 0 0px transparent',
                      }}
                      className="h-3 w-3 rounded-full"
                    />
                    <span
                      className="font-mono text-xs transition-colors"
                      style={{ color: cur ? st.accent : on ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)' }}
                    >
                      {st.n} {st.tag}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ---- horizontal rail (mobile) ---- */}
        <div className="flex items-center px-6 pt-20 pb-4 sm:hidden">
          <div className="relative h-[3px] w-full rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ width: fill, background: 'linear-gradient(90deg,#8b6bff,#4dd4ff,#46f6b4,#ffb36b,#ff6bd0,#7c5cff)' }}
            />
            <div className="absolute -top-[5px] flex w-full justify-between">
              {STEPS.map((st, i) => (
                <motion.span
                  key={st.n}
                  animate={{
                    scale: i === active ? 1.4 : 1,
                    backgroundColor: i <= active ? st.accent : 'rgba(20,22,30,1)',
                    borderColor: i <= active ? st.accent : 'rgba(255,255,255,0.2)',
                  }}
                  className="h-[13px] w-[13px] rounded-full border"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ---- main scene ---- */}
        <div className="relative flex flex-1 items-center px-6 sm:px-10">
          <div className="relative w-full max-w-xl">
            <AnimatePresence>
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(6px)', position: 'absolute' }}
                transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                className="w-full"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-6xl font-bold leading-none sm:text-8xl"
                    style={{ color: s.accent, textShadow: `0 0 50px ${s.accent}66` }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold sm:text-4xl">{s.tag}</h2>
                    <p className="mt-1 text-sm text-white/55 sm:text-base">{s.sub}</p>
                  </div>
                </div>

                <ul className="mt-7 space-y-3">
                  {s.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-start gap-3 text-sm text-white/80 sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.accent }} />
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs sm:text-sm"
                  style={{ borderColor: `${s.accent}55`, color: s.accent, background: `${s.accent}11` }}
                >
                  {s.role}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- closing ---------- */
function Closing() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold leading-tight sm:text-6xl"
      >
        You decide and authorize.
        <br />
        <span className="text-gradient">AI does the rest.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-md font-mono text-sm text-white/45"
      >
        Six decisions · one moving pipeline.
      </motion.p>
    </section>
  )
}

export default function Scrolly() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div className="grain relative min-h-screen bg-[#05060a]">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-[#8b6bff] via-[#4dd4ff] to-[#46f6b4]"
      />
      <Intro />
      <Stage />
      <Closing />
      <footer className="border-t border-white/10 py-10 text-center font-mono text-xs text-white/35">
        Scrollytelling build · React · Tailwind · Framer Motion
      </footer>
    </div>
  )
}
