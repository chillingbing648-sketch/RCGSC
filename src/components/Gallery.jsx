import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lines from './Lines'
import { env, useReveal, lockScroll } from '../lib/scroll'
import { gallery, galleryCategories, asset } from '../content'

function Lightbox({ i, setI, photos, openerRef }) {
  const closeRef = useRef()
  const n = photos.length
  useEffect(() => {
    lockScroll(true); closeRef.current?.focus()
    const k = (e) => {
      if (e.key === 'Escape') setI(null)
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
      if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n)
      if (e.key === 'Tab') {
        const controls = [...document.querySelectorAll('.lb button:not([disabled])')]
        if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1)?.focus() }
        else if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0]?.focus() }
      }
    }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); lockScroll(false); openerRef.current?.focus() }
  }, [])
  const g = photos[i]
  return (
    <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: env.reduce ? 0 : 0.22 }} onClick={() => setI(null)}>
      <div className="lb__top meta"><span>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span><span>{g.caption}</span>
        <button ref={closeRef} onClick={() => setI(null)} aria-label="Close photo viewer">Close</button></div>
      <AnimatePresence mode="wait">
        <motion.img key={i} src={asset(g.src)} alt={g.caption} onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: env.reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }} />
      </AnimatePresence>
      <div className="lb__nav" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous">←</button>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next">→</button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const r = useRef(); const openerRef = useRef(); useReveal(r)
  const [open, setOpen] = useState(null)
  const [category, setCategory] = useState('all')
  const categories = galleryCategories.filter((item) => gallery.some((photo) => photo.category === item.id))
  const photos = category === 'all' ? gallery : gallery.filter((item) => item.category === category)

  const tileMove = (e) => {
    if (!env.fine) return
    const b = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', ((e.clientX - b.left) / b.width - 0.5).toFixed(3))
    e.currentTarget.style.setProperty('--py', ((e.clientY - b.top) / b.height - 0.5).toFixed(3))
  }
  const tileLeave = (e) => { e.currentTarget.style.setProperty('--px', 0); e.currentTarget.style.setProperty('--py', 0) }
  return (
    <section className="section gallery" id="gallery" ref={r}>
      <p className="meta" data-fade>Gallery</p>
      <Lines as="h1" className="display-xl" lines={['Moments', 'we made.']} />
      <div className="gallery__filters" role="group" aria-label="Filter gallery photos">
        {[{ id: 'all', label: 'All' }, ...categories].map((item) => (
          <button key={item.id} type="button" className={category === item.id ? 'is-active' : ''}
            aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>
        ))}
      </div>
      <div className="gal">
        {photos.map((g, i) => (
          <button key={g.src} className={'tile tile--' + g.size} onClick={(e) => { openerRef.current = e.currentTarget; setOpen(i) }} onPointerMove={tileMove} onPointerLeave={tileLeave}
            aria-label={`View ${g.caption}`} data-fade>
            <img src={asset(g.src)} alt="" loading="lazy" decoding="async" style={{ objectPosition: g.pos }} />
            <span className="tile__meta"><b>{galleryCategories.find((item) => item.id === g.category)?.label}</b><span>{g.caption}</span></span>
          </button>
        ))}
      </div>
      <AnimatePresence>{open !== null && <Lightbox i={open} setI={setOpen} photos={photos} openerRef={openerRef} />}</AnimatePresence>
    </section>
  )
}
