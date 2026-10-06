import { useLayoutEffect, useRef } from 'react'
import { gsap, env } from '../lib/scroll'
import { asset, content as c } from '../content'
import { Link } from '../lib/router'
import { routes } from '../routes'

function SocialIcon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true, focusable: false }
  if (name === 'instagram') return <svg {...common}><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.7" cy="6.5" r="1.15" fill="currentColor" /></svg>
  if (name === 'facebook') return <svg {...common} fill="currentColor"><path d="M13.55 21v-8.2h2.76l.41-3.2h-3.17V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.3-.04-1.34-.14-2.55-.14-2.53 0-4.26 1.55-4.26 4.4V9.6H7.17v3.2h2.86V21h3.52Z" /></svg>
  if (name === 'youtube') return <svg {...common}><rect x="2.3" y="5.1" width="19.4" height="13.8" rx="4" fill="currentColor" /><path d="m10 8.7 5.4 3.3-5.4 3.3V8.7Z" fill="#080611" /></svg>
  if (name === 'x') return <svg {...common} fill="currentColor"><path d="M18.9 2.8h3.1l-6.8 7.8 8 10.6h-6.3L12 14.3l-6 6.9H2.8l7.3-8.4L2.4 2.8h6.5l4.4 5.9 5.6-5.9Zm-1.1 16.5h1.7L7.1 4.6H5.3l12.5 14.7Z" /></svg>
  if (name === 'linkedin') return <svg {...common} fill="currentColor"><path d="M5.2 8.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 10h3.4v10.5H3.5V10Zm5.5 0h3.3v1.4h.05c.46-.87 1.58-1.78 3.25-1.78 3.48 0 4.12 2.29 4.12 5.26v5.62h-3.44v-4.98c0-1.19-.02-2.72-1.66-2.72s-1.91 1.3-1.91 2.63v5.07H9V10Z" /></svg>
  return <svg {...common}><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3 20l1.1-4.9a8.4 8.4 0 1 1 16.4-3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M8.7 8.1c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .3-.2 1.2-.7 1.6-.5.4-1.1.6-1.7.5-1-.1-2.4-.6-3.9-1.9-1.2-1.1-2.1-2.5-2.3-3.5-.2-.9.1-1.7.5-2.2Z" fill="currentColor" /></svg>
}

export default function Footer() {
  const r = useRef()
  const socials = c.contact.socials.filter(({ url }) => url)

  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      gsap.from('.foot__brand, .foot__group', {
        y: 18, opacity: 0, duration: .58, stagger: .09, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.foot__columns', start: 'top 88%', once: true },
      })
      gsap.from('.foot__explore-item', {
        y: 10, opacity: 0, duration: .42, stagger: .045, ease: 'power2.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.foot__explore', start: 'top 88%', once: true },
      })
    }, r)
    return () => ctx.revert()
  }, [])

  const explore = routes.filter(({ path }) => path !== '/join')

  return (
    <footer className="foot" id="contact" ref={r}>
      <section className="foot__quote" aria-label="Our spirit">
        <p className="meta">Our way of serving</p>
        <blockquote className="foot__signoff">We don’t just show up.<br /><span>We make it matter.</span></blockquote>
      </section>

      <div className="foot__columns">
        <section className="foot__brand" aria-labelledby="footer-brand-title">
          <img className="foot__logo" src={asset('/images/rcgsc-logo.webp')} alt="" loading="lazy" />
          <h2 className="foot__club" id="footer-brand-title">{c.club}</h2>
          <p className="foot__college">Ghanshyamdas Saraf College<br />{c.district}</p>
          <p className="foot__location"><span className="foot__pin" aria-hidden="true">↗</span>{c.location}</p>
        </section>

        <nav className="foot__group foot__explore" aria-labelledby="footer-explore-title">
          <h2 className="meta foot__heading" id="footer-explore-title">Explore</h2>
          <ul className="foot__explore-list">
            {explore.map((page, i) => (
              <li className="foot__explore-item" key={page.path}>
                <Link className="foot__explore-link" to={page.path}>
                  <span className="foot__explore-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span>{page.label}</span><span className="foot__explore-arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="foot__group" aria-labelledby="footer-involved-title">
          <h2 className="meta foot__heading" id="footer-involved-title">Get involved</h2>
          <p className="foot__invite">Bring your ideas. Find your people. Put service into motion.</p>
          <Link className="foot__cta" to="/join">Find your place <span aria-hidden="true">↗</span></Link>
          <p className="foot__motto">Lead with purpose<br />Leave a lasting impact.</p>
        </section>

        <section className="foot__group" aria-labelledby="footer-connect-title">
          <h2 className="meta foot__heading" id="footer-connect-title">Follow & connect</h2>
          {socials.length > 0
            ? <ul className="foot__socials">{socials.map(({ label, url, icon }) => <li key={label}><a href={url} aria-label={label} title={label} target="_blank" rel="noreferrer"><SocialIcon name={icon} /></a></li>)}</ul>
            : <p className="foot__quiet">Official channels will appear here.</p>}
          {c.contact.email && <a className="foot__email" href={`mailto:${c.contact.email}`}>{c.contact.email}</a>}
        </section>
      </div>

      <div className="foot__legal">
        <p>© {new Date().getFullYear()} {c.club}. All rights reserved.</p>
        <p>Student-led service. Learning, leading and growing through practice.</p>
        <p className="foot__term">{c.theme.club} · {c.year}</p>
      </div>

      <div className="foot__masthead" aria-label="RCGSC — Rotaract Club of Ghanshyamdas Saraf College">
        <p className="meta">Rotaract Club · District 3141 · Malad West, Mumbai</p>
        <p className="foot__big display-xxl" aria-hidden="true">RCGSC</p>
      </div>
    </footer>
  )
}
