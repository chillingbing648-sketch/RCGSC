import { useRef, useState } from 'react'
import Lines from './Lines'
import { useReveal, env } from '../lib/scroll'
import { content, asset } from '../content'

export default function Avenues() {
  const r = useRef(); useReveal(r)
  const [open, setOpen] = useState(-1)
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', e.clientX - b.left + 'px')
    e.currentTarget.style.setProperty('--my', e.clientY - b.top + 'px')
  }
  return (
    <section className="section avenues" id="avenues" ref={r}>
      <p className="meta" data-fade>Four avenues of service</p>
      <Lines className="display-xl" lines={['Where we', 'serve.']} />
      <ul className="rows">
        {content.avenues.map((a, i) => (
          <li key={a.n} className={'row' + (open === i ? ' is-open' : '')} style={{ '--hue': a.hue }}
              onPointerEnter={() => env.fine && setOpen(i)} onPointerLeave={() => env.fine && setOpen(-1)} onPointerMove={move}>
            <button className="row__head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="row__n">{a.n}</span>
              <span className="row__title">{a.title}</span>
              <span className="row__arrow" aria-hidden="true">→</span>
            </button>
            <div className="row__body">
              <div className="row__inner">
                <p>{a.text}</p>
                <div className="row__visual" aria-hidden="true">
                  <img src={a.img || asset("/images/group-photo.webp")} alt="" loading="lazy" style={{ objectPosition: a.pos }} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
