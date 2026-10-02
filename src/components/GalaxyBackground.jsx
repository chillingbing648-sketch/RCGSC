import { useEffect, useRef } from 'react'

// Three depth layers of sparse stars. Far = tiny/slow, near = larger/faster + more pointer parallax.
const LAYERS = [
  { share: .6, size: [.4, .9], speed: .006, parallax: 4,  alpha: [.25, .6] },
  { share: .3, size: [.7, 1.3], speed: .014, parallax: 10, alpha: [.4, .8] },
  { share: .1, size: [1.2, 2.0], speed: .03, parallax: 22, alpha: [.5, 1] },
]
const TINTS = ['242,238,252', '200,190,255', '255,214,190']

export default function GalaxyBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    let w = 0, h = 0, dpr = 1, stars = [], raf = 0, running = true
    let px = 0, py = 0, tx = 0, ty = 0
    let scrollY = window.scrollY

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const total = Math.round(Math.min(w < 768 ? 70 : 170, (w * h) / 9000))
      stars = []
      LAYERS.forEach((L, li) => {
        const n = Math.round(total * L.share)
        for (let i = 0; i < n; i++) {
          stars.push({
            li, x: Math.random() * w, y: Math.random() * h,
            r: L.size[0] + Math.random() * (L.size[1] - L.size[0]),
            a: L.alpha[0] + Math.random() * (L.alpha[1] - L.alpha[0]),
            t: Math.random() * Math.PI * 2, tw: .4 + Math.random() * .9,
            c: TINTS[(Math.random() * TINTS.length) | 0],
          })
        }
      })
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h)
      px += (tx - px) * .05; py += (ty - py) * .05
      for (const s of stars) {
        const L = LAYERS[s.li]
        let y = (s.y - scrollY * L.speed * 10) % h
        if (y < 0) y += h
        const x = s.x + px * L.parallax
        const yy = y + py * L.parallax
        const tw = reduce ? 1 : .65 + .35 * Math.sin(time * .001 * s.tw + s.t)
        ctx.fillStyle = `rgba(${s.c},${(s.a * tw).toFixed(3)})`
        ctx.beginPath(); ctx.arc(x, yy, s.r, 0, 6.2832); ctx.fill()
      }
    }

    const loop = (t) => { if (running) { draw(t); raf = requestAnimationFrame(loop) } }
    const onMove = (e) => { tx = (e.clientX / w - .5); ty = (e.clientY / h - .5) }
    const onScroll = () => { scrollY = window.scrollY; if (reduce) draw(0) }
    const onResize = () => { build(); draw(0) }
    const onVis = () => {
      running = !document.hidden && !reduce
      if (running) raf = requestAnimationFrame(loop)
    }

    build(); draw(0)
    if (!reduce) {
      raf = requestAnimationFrame(loop)
      if (!coarse) window.addEventListener('pointermove', onMove, { passive: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      running = false; cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div className="galaxy" aria-hidden="true">
      <div className="nebula nebula--a" />
      <div className="nebula nebula--b" />
      <div className="nebula nebula--c" />
      <canvas ref={canvasRef} />
      <div className="galaxy__vignette" />
      <div className="galaxy__grain" />
    </div>
  )
}
