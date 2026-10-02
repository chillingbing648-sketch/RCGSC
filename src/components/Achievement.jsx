import { useLayoutEffect, useRef } from 'react'
import { gsap, env, useReveal } from '../lib/scroll'
import { content } from '../content'

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
    <section className="section daan" id="daanveer" ref={r}>
      <p className="daan__word display-xxl" aria-hidden="true">{d.title}</p>
      <div className="daan__grid">
        <div className="daan__body">
          <p className="meta" data-fade>Achievement</p>
          <blockquote className="daan__quote" data-fade><span aria-hidden="true">“</span>{d.statement}</blockquote>
          <p className="meta" data-fade>{d.note}</p>
        </div>
        <figure className="daan__img"><img src={d.img} alt="Daanveer Citation presented to the Rotaract Club of Ghanshyamdas Saraf College" loading="lazy" /></figure>
      </div>
    </section>
  )
}
