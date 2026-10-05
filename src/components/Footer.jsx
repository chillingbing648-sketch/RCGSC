import { useLayoutEffect, useRef } from 'react'
import { gsap, env } from '../lib/scroll'
import { content as c } from '../content'
import { Link } from '../lib/router'
import { routes } from '../routes'

export default function Footer() {
  const r = useRef()
  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: r.current, start: 'top 90%', end: 'top 15%', scrub: true } })
      tl.fromTo('.foot__big', { yPercent: 45, opacity: 0.15 }, { yPercent: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.foot__row > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: 'none' }, 0.2)
    }, r)
    return () => ctx.revert()
  }, [])
  const ext = Object.entries(c.contact).filter(([k, v]) => v && k !== 'join')
  return (
    <footer className="foot" id="contact" ref={r}>
      <p className="foot__big display-xxl">RCGSC</p>
      <div className="foot__row">
        <div>
          <p className="foot__club">Rotaract Club of<br />Ghanshyamdas Saraf College</p>
          <p className="meta">{c.location}</p>
        </div>
        <nav aria-label="Footer"><ul>
          {routes.map((page) => <li key={page.path}><Link to={page.path}>{page.label}</Link></li>)}
        </ul></nav>
        {ext.length > 0 && (
          <ul className="foot__contact">
            {ext.map(([k, v]) => <li key={k}><a href={k === 'email' ? 'mailto:' + v : v}>{k}</a></li>)}
          </ul>)}
      </div>
      <p className="meta foot__legal">© {c.year} Rotaract Club of Ghanshyamdas Saraf College · {c.district}</p>
    </footer>
  )
}
