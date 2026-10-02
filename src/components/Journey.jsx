import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap, ScrollTrigger, env } from '../lib/scroll'
import { content } from '../content'

const items = content.journey
const n = items.length
const pts = items.map((_, k) => ({ x: 120 + (k * 760) / (n - 1), y: 470 - (k * 340) / (n - 1) }))
const D = 'M' + pts.map((p) => `${p.x} ${p.y}`).join(' L')
const DUST = Array.from({ length: 26 }, (_, i) => ({ x: (i * 397) % 1000, y: (i * 211) % 560, r: 0.8 + ((i * 7) % 3) * 0.5 }))

export default function Journey() {
  const root = useRef(); const line = useRef()
  const [i, setI] = useState(0)

  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      gsap.set(line.current, { strokeDashoffset: 1 })
      ScrollTrigger.create({
        trigger: root.current, start: 'top top', end: `+=${n * (env.small ? 60 : 85)}%`, pin: true, scrub: true,
        onUpdate: (s) => { gsap.set(line.current, { strokeDashoffset: 1 - s.progress }); setI(Math.min(n - 1, Math.round(s.progress * (n - 1)))) },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  if (env.reduce) {
    return (
      <section className="section journey journey--static" id="journey">
        <h2 className="display-xl">Journey</h2>
        {items.map((it) => (
          <article key={it.year}><p className="journey__year">{it.year}</p><h3>{it.title}</h3><p>{it.text}</p></article>
        ))}
      </section>
    )
  }
  const it = items[i]
  return (
    <section className="journey" id="journey" ref={root}>
      {items.map((x, k) => (
        <div key={k} className="journey__atmos" style={{ opacity: k === i ? 1 : 0, background: `radial-gradient(70% 70% at 75% 40%, ${x.hue}55, transparent 70%)` }} />
      ))}
      <p className="meta journey__label">Journey</p>
      <div className="journey__text">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <p className="journey__year">{it.year}</p>
            <h3 className="journey__title">{it.title}</h3>
            <p className="journey__copy">{it.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="journey__img">
        <AnimatePresence mode="popLayout">
          <motion.img key={i} src={it.img} alt="" style={{ objectPosition: it.pos }} loading="lazy"
            initial={{ opacity: 0, scale: 1.12, clipPath: 'inset(0 0 0 100%)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0%)' }}
            exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        </AnimatePresence>
      </div>
      <svg className="journey__svg" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        {DUST.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={d.r} fill="#fff" opacity=".25" />)}
        <path d={D} pathLength="1" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.2" />
        <path ref={line} d={D} pathLength="1" fill="none" stroke="url(#jg)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="1" />
        <defs><linearGradient id="jg" x1="0" x2="1"><stop offset="0" stopColor="#7c4dff" /><stop offset=".6" stopColor="#d946a8" /><stop offset="1" stopColor="#ff8a5b" /></linearGradient></defs>
        {pts.map((p, k) => (
          <g key={k} className={'jnode' + (k <= i ? ' is-lit' : '') + (k === i ? ' is-now' : '')} transform={`translate(${p.x} ${p.y})`}>
            <circle className="jnode__halo" r="22" /><circle className="jnode__dot" r="6" />
            <text y="-30" textAnchor="middle" className="jnode__year">{items[k].label || items[k].year}</text>
          </g>
        ))}
      </svg>
    </section>
  )
}
