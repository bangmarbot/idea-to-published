import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

/* ---------- data ---------- */
const STEPS = [
  {
    n: '01',
    tag: 'Define Requirements',
    sub: "The one step AI can't do for you.",
    accent: '#8b6bff',
    points: [
      ['What', 'are you building?'],
      ['Why', 'does it need to exist?'],
      ['Who', 'is it for?'],
      ['Success', 'looks like what? (sign-ups? reads? contacts?)'],
    ],
    note: 'Your job: 100%. Garbage in, garbage out — a vague brief gives you a vague app.',
    role: '🧠 You think. AI waits.',
  },
  {
    n: '02',
    tag: 'Choose Your Stack',
    sub: 'Pick your tools by answering one question.',
    accent: '#4dd4ff',
    question: 'Does it need to store data or log users in?',
    branches: [
      ['No', 'Static stack — Astro + Tailwind. Fast, cheap, simple.'],
      ['Yes', 'Add a backend — Supabase: database + auth + storage.'],
    ],
    ladder: [
      ['HTML', 'Tiny, one-off page'],
      ['Astro', 'Landing, portfolio, blog — start here', true],
      ['Next.js', 'Login, dashboards, app features'],
    ],
    note: 'AI suggests, you decide. Don’t reach for Next.js when Astro will do.',
    role: '🤝 AI advises. You choose.',
  },
  {
    n: '03',
    tag: 'Design',
    sub: 'Lock the look before building.',
    accent: '#46f6b4',
    routes: [
      ['Figma mockup', 'See & approve before code', 'most polished'],
      ['Prototype tool', 'Type intent, get clickable UI', 'fast exploring'],
      ['Design-in-code', 'AI builds with ready components', 'fastest'],
    ],
    note: 'Lock your color, font, and layout — that’s your brand kit. AI generates options; you bring the taste.',
    role: '🎨 AI renders. You curate.',
  },
  {
    n: '04',
    tag: 'Build',
    sub: 'Let AI write the code — but stay in the loop.',
    accent: '#ffb36b',
    list: [
      'Review in small chunks, not one giant dump.',
      'Content first, polish second.',
      'New version each iteration — never overwrite (keeps your undo button).',
    ],
    note: 'AI does the typing. You do the judging.',
    role: '⚙️ AI types. You judge.',
  },
  {
    n: '05',
    tag: 'Deploy',
    sub: "Two places — don't confuse them.",
    accent: '#ff6bd0',
    twobox: [
      ['GitHub', 'where your code lives', 'the warehouse'],
      ['Hosting', 'where your app lives for visitors', 'Vercel / Cloudflare / GitHub Pages'],
    ],
    flow: 'code  →  push to GitHub  →  host publishes it  →  live on your domain',
    note: 'You authorize once. After that, every change ships automatically.',
    role: '🚀 You authorize. AI ships.',
  },
  {
    n: '06',
    tag: 'Post-Publish',
    sub: 'Publishing is the start line, not the finish.',
    accent: '#7c5cff',
    list: [
      'Analytics — who’s visiting, from where, doing what.',
      'Check mobile + speed — most visitors are on phones; slow = gone.',
      'Iterate — read the data, fix, repeat.',
    ],
    note: 'The launch is data point #1, not the trophy.',
    role: '📈 AI builds. You learn & loop.',
  },
]

const FLOW = ['Define', 'Stack', 'Design', 'Build', 'Deploy', 'Post-Publish']

/* ---------- motion helpers ---------- */
const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.21, 0.6, 0.35, 1] },
  }),
}

function Reveal({ children, i = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fade}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- background ---------- */
function Aurora() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora absolute -top-40 -left-40 h-[55vh] w-[55vh] rounded-full bg-[#6d4bff] opacity-30 blur-[120px]" />
      <div className="aurora absolute top-1/3 -right-40 h-[50vh] w-[50vh] rounded-full bg-[#16b6ff] opacity-25 blur-[120px]" style={{ animationDelay: '-6s' }} />
      <div className="aurora absolute bottom-0 left-1/4 h-[45vh] w-[45vh] rounded-full bg-[#10c98a] opacity-20 blur-[120px]" style={{ animationDelay: '-12s' }} />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  )
}

/* ---------- step blocks ---------- */
function StepBody({ s }) {
  return (
    <div className="mt-7 space-y-5">
      {s.points && (
        <div className="grid gap-3 sm:grid-cols-2">
          {s.points.map(([k, v], i) => (
            <Reveal i={i} key={k}>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <span className="font-mono text-sm" style={{ color: s.accent }}>{k}</span>
                <p className="mt-1 text-sm text-white/70">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {s.question && (
        <Reveal>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-sm text-white/50">decision</p>
            <p className="mt-1 text-lg font-semibold">“{s.question}”</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.branches.map(([k, v]) => (
                <div key={k} className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <span className="font-mono text-sm" style={{ color: s.accent }}>{k} →</span>
                  <p className="mt-1 text-sm text-white/70">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {s.ladder && (
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-white/10">
            {s.ladder.map(([k, v, hot], i) => (
              <div
                key={k}
                className="flex items-center gap-4 border-b border-white/5 p-4 last:border-0"
                style={hot ? { background: 'rgba(77,212,255,0.07)' } : {}}
              >
                <span className="w-20 shrink-0 font-mono text-sm" style={{ color: hot ? s.accent : '#fff' }}>{k}</span>
                <span className="text-sm text-white/70">{v}</span>
                {hot && <span className="ml-auto font-mono text-xs text-[#4dd4ff]">★ start</span>}
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {s.routes && (
        <div className="grid gap-3 sm:grid-cols-3">
          {s.routes.map(([k, v, t], i) => (
            <Reveal i={i} key={k}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                <p className="mt-1 font-semibold" style={{ color: s.accent }}>{k}</p>
                <p className="mt-1 text-sm text-white/65">{v}</p>
                <p className="mt-3 font-mono text-xs text-white/40">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {s.twobox && (
        <div className="grid gap-3 sm:grid-cols-2">
          {s.twobox.map(([k, v, t], i) => (
            <Reveal i={i} key={k}>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-semibold" style={{ color: s.accent }}>{k}</p>
                <p className="mt-1 text-sm text-white/70">{v}</p>
                <p className="mt-3 font-mono text-xs text-white/40">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {s.flow && (
        <Reveal>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-center font-mono text-xs text-white/60 sm:text-sm">
            {s.flow}
          </div>
        </Reveal>
      )}

      {s.list && (
        <div className="space-y-2">
          {s.list.map((t, i) => (
            <Reveal i={i} key={i}>
              <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <span className="font-mono text-sm" style={{ color: s.accent }}>—</span>
                <p className="text-sm text-white/75">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <p className="text-sm italic text-white/50">{s.note}</p>
      </Reveal>
    </div>
  )
}

function Step({ s }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span
            className="font-mono text-5xl font-bold sm:text-6xl"
            style={{ color: s.accent, textShadow: `0 0 40px ${s.accent}55` }}
          >
            {s.n}
          </span>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{s.tag}</h2>
            <p className="mt-1 text-white/55">{s.sub}</p>
          </div>
        </div>
      </Reveal>
      <StepBody s={s} />
      <Reveal>
        <div
          className="mt-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm"
          style={{ borderColor: `${s.accent}55`, color: s.accent, background: `${s.accent}11` }}
        >
          {s.role}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- flow diagram ---------- */
function FlowDiagram() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <p className="text-center font-mono text-sm text-white/40">the whole map</p>
      </Reveal>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {FLOW.map((f, i) => (
          <div key={f} className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium"
            >
              <span className="font-mono text-xs text-white/40">{i + 1}</span>{' '}
              {f}
            </motion.div>
            {i < FLOW.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="text-white/25"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- hero ---------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div style={{ y, opacity }} className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm tracking-widest text-white/50 uppercase"
        >
          A workflow for beginners → mid builders
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
          className="mx-auto mt-6 max-w-xl text-lg text-white/65"
        >
          A clear workflow for shipping a web app with AI — even if you're just starting out.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-8 max-w-lg text-sm italic text-white/45"
        >
          AI can write every line of code. Your real job is the decisions. This is the map of which decisions matter — and when.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono text-xs">scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}

/* ---------- app ---------- */
export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div className="grain relative min-h-screen">
      <Aurora />

      {/* scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-[#8b6bff] via-[#4dd4ff] to-[#46f6b4]"
      />

      <Hero />

      <FlowDiagram />

      {STEPS.map((s) => (
        <Step key={s.n} s={s} />
      ))}

      {/* closing */}
      <section className="relative mx-auto max-w-3xl px-6 py-32 text-center">
        <Reveal>
          <h2 className="text-4xl font-bold leading-tight sm:text-6xl">
            You decide and authorize.
            <br />
            <span className="text-gradient">AI does the rest.</span>
          </h2>
        </Reveal>
        <Reveal i={1}>
          <p className="mx-auto mt-6 max-w-md text-white/55">
            Six steps. One question per step. Ship faster by knowing which calls are yours.
          </p>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 py-10 text-center font-mono text-xs text-white/35">
        Built with React · Tailwind · Framer Motion — deployed on GitHub Pages
      </footer>
    </div>
  )
}
