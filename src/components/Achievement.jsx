import { useLayoutEffect, useRef } from 'react'
import { gsap, env, useReveal } from '../lib/scroll'
import { content, asset } from '../content'

export default function Achievement() {
  const r = useRef(); useReveal(r)
  const d = content.daanveer
  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.daan__img', { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.daan__img', start: 'top 90%', end: 'top 30%', scrub: true } })
      gsap.fromTo('.daan__img img', { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.daan__img', start: 'top 90%', end: 'bottom 30%', scrub: true } })
      if (!env.small) gsap.fromTo('.daan__word', { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, r)
    return () => ctx.revert()
  }, [])
  return (
    <section className="section daan" id="achievements" ref={r} aria-label="Achievements and service highlights">
      <p className="daan__word display-xxl" aria-hidden="true">{d.title}</p>
      <div className="daan__grid">
        <div className="daan__body">
          <h1 className="meta" data-fade>Achievements · 2026–27</h1>
          <blockquote className="daan__quote" data-fade><span aria-hidden="true">“</span>{d.statement}</blockquote>
          <p className="meta" data-fade>{d.note}</p>
        </div>
        <figure className="daan__img"><img src={asset(d.img)} alt="Daanveer Citation presented to the Rotaract Club of Ghanshyamdas Saraf College" loading="lazy" /></figure>
      </div>
      <div className="achievement-list" aria-label="Achievements and service highlights">
        {content.achievements.map((item, i) => (
          <article className="achievement-card" key={item.title} data-fade>
            <span className="achievement-card__number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="meta">{item.kind}</p>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </div>
            <span className="achievement-card__year">2026–27</span>
          </article>
        ))}
      </div>
    </section>
  )
}
