import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo, lockScroll } from '../lib/scroll'

const LINKS = [
  { id: 'about', label: 'About' }, { id: 'year', label: '2026–27' }, { id: 'avenues', label: 'Avenues' },
  { id: 'journey', label: 'Journey' }, { id: 'gallery', label: 'Gallery' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 60)
    onS(); window.addEventListener('scroll', onS, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' })
    ;[...LINKS.map((l) => l.id), 'join', 'hero'].forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onS); io.disconnect() }
  }, [])

  useEffect(() => { lockScroll(open) }, [open])
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])

  const go = (id) => { setOpen(false); setTimeout(() => scrollTo('#' + id), open ? 400 : 0) }

  return (
    <>
      <header className={'nav' + (scrolled ? ' nav--solid' : '')}>
        <a className="nav__brand" href="#hero" onClick={(e) => { e.preventDefault(); go('hero') }}>RCGSC</a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.id} href={'#' + l.id} onClick={(e) => { e.preventDefault(); go(l.id) }}
               className={active === l.id ? 'is-active' : ''}>
              {l.label}
              {active === l.id && <motion.span layoutId="nav-dot" className="nav__dot" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            </a>
          ))}
        </nav>
        <a className="btn btn--sm nav__cta" href="#join" onClick={(e) => { e.preventDefault(); go('join') }}>Join us</a>
        <button className={'burger' + (open ? ' is-open' : '')} aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" role="dialog" aria-label="Menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.2rem) 2.2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.2rem) 2.2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.2rem) 2.2rem)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <ul>
              {[...LINKS, { id: 'join', label: 'Join us' }].map((l, i) => (
                <motion.li key={l.id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}>
                  <a href={'#' + l.id} onClick={(e) => { e.preventDefault(); go(l.id) }}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <p className="meta">{'Malad West, Mumbai'}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
