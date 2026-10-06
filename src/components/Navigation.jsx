import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { env, lockScroll } from '../lib/scroll'
import { asset } from '../content'
import { Link, useRouter } from '../lib/router'
import { routes } from '../routes'

const PRIMARY_LINKS = routes.filter((page) => !['/', '/join'].includes(page.path))

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const { route } = useRouter()
  const homeActive = route === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { lockScroll(open) }, [open])
  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector('a')?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setOpen(false); return }
      if (event.key !== 'Tab') return
      const links = [...menuRef.current.querySelectorAll('a')]
      if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links.at(-1)?.focus() }
      else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); links[0]?.focus() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { window.removeEventListener('keydown', onKeyDown); triggerRef.current?.focus() }
  }, [open])

  const closeMenu = () => setOpen(false)
  return (
    <>
      <header className={'nav' + (scrolled ? ' nav--solid' : '')}>
        <Link className={'nav__brand' + (homeActive ? ' is-active' : '')} to="/" aria-label="RCGSC home">
          <img className="nav__logo" src={asset('/images/rcgsc-logo.webp')} alt="" />
          <span>RCGSC</span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {PRIMARY_LINKS.map((page) => (
            <Link key={page.path} to={page.path} className={route === page.path ? 'is-active' : ''} aria-current={route === page.path ? 'page' : undefined}>
              {page.label}
              {route === page.path && <motion.span aria-hidden="true" layoutId="nav-dot" className="nav__dot" transition={env.reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }} />}
            </Link>
          ))}
        </nav>
        <Link className={'btn btn--sm nav__cta' + (route === '/join' ? ' is-active' : '')} to="/join" aria-current={route === '/join' ? 'page' : undefined}><span>Join us</span></Link>
        <button ref={triggerRef} className={'burger' + (open ? ' is-open' : '')} aria-expanded={open} aria-controls="site-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav ref={menuRef} id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: env.reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}>
            <ul>
              {routes.map((page, i) => (
                <motion.li key={page.path} initial={{ y: env.reduce ? 0 : 10, opacity: env.reduce ? 1 : 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: env.reduce ? 0 : 0.035 + i * 0.025, duration: env.reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={page.path} onClick={closeMenu} aria-current={route === page.path ? 'page' : undefined}>{page.label}</Link>
                </motion.li>
              ))}
            </ul>
            <p className="meta">Malad West, Mumbai</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
