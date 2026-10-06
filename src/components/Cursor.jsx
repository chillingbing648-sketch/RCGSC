import { useEffect, useRef } from 'react'
import { env, gsap } from '../lib/scroll'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!env.fine || env.reduce) return
    const cursor = ref.current
    if (!cursor) return

    document.body.classList.add('has-custom-cursor')
    const moveX = gsap.quickTo(cursor, 'x', { duration: .16, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: .16, ease: 'power3.out' })
    const onMove = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
      cursor.classList.add('is-visible')
    }
    const onOver = (event) => {
      const target = event.target instanceof Element
        ? event.target.closest('a, button, [role="button"], input, select, textarea, summary')
        : null
      cursor.classList.toggle('is-interactive', Boolean(target && !target.hasAttribute('disabled')))
    }
    const onLeave = () => {
      cursor.classList.remove('is-visible', 'is-interactive')
    }
    const onWindowOut = (event) => { if (!event.relatedTarget) onLeave() }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerout', onWindowOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onWindowOut)
      document.body.classList.remove('has-custom-cursor')
      gsap.killTweensOf(cursor)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <svg className="cursor__arrow" viewBox="0 0 40 50" fill="none" focusable="false">
        <defs>
          <linearGradient id="cursor-arrow-fill" x1="4" y1="2" x2="31" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2EEFC" />
            <stop offset=".52" stopColor="#B9A8FF" />
            <stop offset="1" stopColor="#6286FF" />
          </linearGradient>
        </defs>
        <path className="cursor__arrow-edge" d="M2 2 4 39 13 29 21 47 29 43 21 26 38 24 2 2Z" />
        <path className="cursor__arrow-body" d="M2 2 4 39 13 29 21 47 29 43 21 26 38 24 2 2Z" />
        <path className="cursor__arrow-sheen" d="m7 10 1 22 5-6 4-2L7 10Z" />
        <path className="cursor__arrow-trail" d="m11 39-5 7" />
      </svg>
    </div>
  )
}
