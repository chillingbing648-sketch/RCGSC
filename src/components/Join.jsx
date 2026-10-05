import { useLayoutEffect, useRef } from 'react'
import { gsap, env, useReveal, scrollTo } from '../lib/scroll'
import { content, asset } from '../content'

export default function Join() {
  const r = useRef(); useReveal(r)
  useLayoutEffect(() => {
    if (env.reduce || env.small) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.join__crest', { yPercent: 12, rotate: -6 }, { yPercent: -12, rotate: 6, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, r)
    return () => ctx.revert()
  }, [])
  const href = content.contact.join || '#contact'
  return (
    <section className="join" id="join" ref={r}>
      <img className="join__crest" src={asset("/images/reign-crest.webp")} alt="" loading="lazy" />
      <div className="join__inner">
        <p className="meta" data-fade>Join us</p>
        <h1 className="join__title display-xxl" data-lines aria-label="Service above self">
          {['SERVICE', 'ABOVE', 'SELF'].map((w) => <span className="line" key={w} aria-hidden="true"><span>{w}</span></span>)}
        </h1>
        <p className="join__tag" data-fade>Lead. Serve. Create impact.</p>
        <a className="btn btn--lg" data-fade href={href} onClick={(e) => { if (href.startsWith('#')) { e.preventDefault(); scrollTo(href) } }}>Become a Rotaractor</a>
      </div>
    </section>
  )
}
