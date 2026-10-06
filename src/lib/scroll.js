import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'
gsap.registerPlugin(ScrollTrigger)

export const env = {
  reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
  fine: matchMedia('(hover: hover) and (pointer: fine)').matches,
  small: matchMedia('(max-width: 1024px)').matches,
}
let lenis = null
export function initScroll() {
  if (env.reduce) return () => {}
  lenis = new Lenis({ lerp: env.small ? 0.12 : 0.085, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
  return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null }
}
export const scrollTo = (sel) => {
  const el = document.querySelector(sel); if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 0.85, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else el.scrollIntoView({ behavior: env.reduce ? 'auto' : 'smooth' })
}
export const scrollToPosition = (top = 0) => {
  if (lenis) lenis.scrollTo(top, { immediate: true })
  else window.scrollTo({ top, behavior: 'auto' })
}
export const scrollToTop = () => {
  scrollToPosition(0)
}
export const lockScroll = (on) => {
  if (lenis) on ? lenis.stop() : lenis.start()
  else document.body.style.overflow = on ? 'hidden' : ''
}
// generic reveal: [data-lines] (masked line rise) and [data-fade]
export function useReveal(ref) {
  useLayoutEffect(() => {
    if (env.reduce) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-lines]').forEach((el) =>
        gsap.from(el.querySelectorAll('.line > span'), {
          yPercent: 108, duration: env.small ? 0.72 : 0.92, ease: 'expo.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }))
      gsap.utils.toArray('[data-fade]').forEach((el) =>
        gsap.from(el, { y: 16, opacity: 0, duration: env.small ? 0.62 : 0.78, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
    }, ref)
    return () => ctx.revert()
  }, [])
}
export { gsap, ScrollTrigger }
