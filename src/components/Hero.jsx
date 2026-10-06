import { useLayoutEffect, useRef } from 'react'
import { gsap, env, scrollTo } from '../lib/scroll'
import { content, asset } from '../content'
import { Link } from '../lib/router'

export default function Hero() {
  const root = useRef()
  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero__letter', { yPercent: 108, duration: env.small ? 0.75 : 1.1, stagger: 0.045 }, 0.12)
        .from('.hero__fade', { y: 16, opacity: 0, duration: 0.78, stagger: 0.08 }, 0.42)
        .fromTo('.hero__photo', { clipPath: 'inset(8% 6% 8% 6% round 16px)', scale: 1.08 },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, duration: 1.35, ease: 'power3.out' }, 0)
        .to('.hero__photo img', { scale: 1.045, duration: 18, ease: 'none' }, 0)
      if (!env.small) {
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero__photo img', { yPercent: 9, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__title', { yPercent: -14, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__sub', { yPercent: -6, opacity: 0.35, ease: 'none', scrollTrigger: st })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero__photo"><img src={asset('/images/group-photo.jpeg')} alt="" fetchpriority="high" /></div>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <p className="meta hero__fade">{content.district} · {content.year}</p>
        <h1 className="hero__title display-xxl" aria-label="RCGSC">
          <span className="hero__mask" aria-hidden="true">
            {'RCGSC'.split('').map((c, i) => <span className="hero__letter" key={i}>{c}</span>)}
          </span>
        </h1>
        <div className="hero__sub">
          <p className="hero__club hero__fade">Rotaract Club of<br />Ghanshyamdas Saraf College</p>
          <p className="lede hero__fade">Service across community, club, profession and the world — led by students in {content.location}.</p>
          <div className="hero__cta hero__fade">
            <Link className="btn" to="/join"><span>Join us</span></Link>
            <Link className="btn btn--ghost" to="/journey"><span>The journey</span></Link>
          </div>
        </div>
      </div>
      <a className="hero__scroll hero__fade" href="#about" onClick={(e) => { e.preventDefault(); scrollTo('#about') }} aria-label="Scroll down">
        <span>Scroll</span><i />
      </a>
    </section>
  )
}
