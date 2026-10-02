import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lines from './Lines'
import { gsap, env, useReveal, lockScroll } from '../lib/scroll'
import { gallery } from '../content'

function Lightbox({ i, setI }) {
  const closeRef = useRef()
  const n = gallery.length
  useEffect(() => {
    lockScroll(true); closeRef.current?.focus()
    const k = (e) => {
      if (e.key === 'Escape') setI(null)
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
      if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n)
    }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); lockScroll(false) }
  }, [])
  const g = gallery[i]
  return (
    <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} onClick={() => setI(null)}>
      <div className="lb__top meta"><span>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span><span>{g.caption}</span>
        <button ref={closeRef} onClick={() => setI(null)}>Close</button></div>
      <AnimatePresence mode="wait">
        <motion.img key={i} src={g.src} alt={g.caption} onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
      </AnimatePresence>
      <div className="lb__nav" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous">←</button>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next">→</button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const r = useRef(); const cur = useRef(); useReveal(r)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!env.fine || env.reduce) return
    const x = gsap.quickTo(cur.current, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(cur.current, 'y', { duration: 0.35, ease: 'power3' })
    const m = (e) => { x(e.clientX); y(e.clientY) }
    window.addEventListener('pointermove', m, { passive: true })
    return () => window.removeEventListener('pointermove', m)
  }, [])

  const tileMove = (e) => {
    if (!env.fine) return
    const b = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', ((e.clientX - b.left) / b.width - 0.5).toFixed(3))
    e.currentTarget.style.setProperty('--py', ((e.clientY - b.top) / b.height - 0.5).toFixed(3))
  }
  const tileLeave = (e) => { e.currentTarget.style.setProperty('--px', 0); e.currentTarget.style.setProperty('--py', 0) }
  const cursor = (on) => () => cur.current?.classList.toggle('is-on', on)

  return (
    <section className="section gallery" id="gallery" ref={r}>
      <p className="meta" data-fade>Gallery</p>
      <Lines className="display-xl" lines={['Moments', 'we made.']} />
      <div className="gal" onPointerEnter={cursor(true)} onPointerLeave={cursor(false)}>
        {gallery.map((g, i) => (
          <button key={i} className={'tile tile--' + g.size} onClick={() => setOpen(i)} onPointerMove={tileMove} onPointerLeave={tileLeave}
            aria-label={`Open photo ${i + 1}`} data-fade>
            <img src={g.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: g.pos, '--z': g.zoom }} />
            <span className="tile__meta"><b>{String(i + 1).padStart(2, '0')}</b><span>{g.caption}</span></span>
          </button>
        ))}
      </div>
      <div className="cursor" ref={cur} aria-hidden="true"><span>View</span></div>
      <AnimatePresence>{open !== null && <Lightbox i={open} setI={setOpen} />}</AnimatePresence>
    </section>
  )
}
