import { useLayoutEffect, useRef } from 'react'
import Lines from './Lines'
import { gsap, env, useReveal } from '../lib/scroll'
import { content as c } from '../content'

export default function CurrentYear() {
  const r = useRef(); useReveal(r)
  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.year__photo', { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.year__photo', start: 'top 92%', end: 'top 35%', scrub: true } })
      gsap.fromTo('.year__photo img', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.year__photo', start: 'top 92%', end: 'bottom 20%', scrub: true } })
      if (!env.small) gsap.fromTo('.year__num', { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, r)
    return () => ctx.revert()
  }, [])
  return (
    <section className="section year" id="year" ref={r}>
      <p className="meta" data-fade>{c.district}</p>
      <div className="year__numwrap"><h2 className="display-xxl year__num">{c.year}</h2></div>
      <Lines className="display-xl year__head" lines={['New term.', 'New theme.']} />
      <figure className="year__photo"><img src="/images/group-photo.jpeg" alt="Members of the Rotaract Club of Ghanshyamdas Saraf College" loading="lazy" /></figure>
      <div className="year__cols">
        <div data-fade className="year__crest">
          <img src="/images/reign-crest.webp" alt="REIGN — Unleash the Grace, RCGSC 26-27 crest" loading="lazy" />
        </div>
        <div data-fade>
          <p className="meta">Club theme</p>
          <p className="year__big">{c.theme.club}<br /><span>{c.theme.tagline}</span></p>
        </div>
        <div data-fade>
          <p className="meta">{c.president.role}</p>
          <p className="year__big year__big--sm">{c.president.name}</p>
        </div>
        <div data-fade>
          <p className="meta">{c.district}</p>
          <p className="year__big year__big--sm">{c.theme.rotary}</p>
        </div>
      </div>
    </section>
  )
}
