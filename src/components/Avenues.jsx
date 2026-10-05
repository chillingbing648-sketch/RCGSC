import { useRef, useState } from 'react'
import Lines from './Lines'
import { useReveal } from '../lib/scroll'
import { content, asset } from '../content'
import { Link } from '../lib/router'


export default function Avenues() {
  const r = useRef(); useReveal(r)
  const [open, setOpen] = useState(-1)
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', e.clientX - b.left + 'px')
    e.currentTarget.style.setProperty('--my', e.clientY - b.top + 'px')
  }
  return (
    <section className="section avenues" id="avenues" ref={r} aria-label="RCGSC avenues of service">
      <p className="meta" data-fade>Four avenues of service · 2026–27</p>
      <Lines as="h1" className="display-xl" lines={['Where we', 'serve.']} />
      <p className="avenues__lede" data-fade>Each avenue gives members a different way to put service, fellowship and growth into practice.</p>
      <ul className="rows">
        {content.avenues.map((a, i) => (
          <li key={a.n} className={'row' + (open === i ? ' is-open' : '')} style={{ '--hue': a.hue }}
              onPointerMove={move}>
            <button className="row__head" aria-expanded={open === i} aria-controls={`avenue-${a.n}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="row__n">{a.n}</span>
              <span className="row__title">{a.title}</span>
              <span className="row__arrow" aria-hidden="true">→</span>
            </button>
            <div className="row__body" id={`avenue-${a.n}`} aria-hidden={open !== i}>
              <div className="row__inner">
                <div className="row__copy">
                  <p>{a.text}</p>
                  <p className="row__purpose"><span className="meta">Purpose</span>{a.purpose}</p>
                  {a.relatedMembers.length > 0
                    ? <p className="row__connection"><span className="meta">Committee connection</span>{a.relatedMembers.map((member) => <span key={member.name}>{member.name} · {member.role}</span>)}</p>
                    : <p className="row__connection"><span className="meta">Committee connection</span>Members work together across the four avenues.</p>}
                  {a.projects.length === 0
                    ? <p className="row__projects">Project stories will be added as details are confirmed.</p>
                    : <ul className="row__projects">{a.projects.map((project) => <li key={project.title}>{project.title}</li>)}</ul>}
                  <Link className="row__link" to="/committee" tabIndex={open === i ? 0 : -1}>Meet the committee <span aria-hidden="true">↗</span></Link>
                </div>
                <div className="row__visual" aria-hidden="true">

                  <img src={asset(a.img || '/images/group-photo.jpeg')} alt="" loading="lazy" style={{ objectPosition: a.pos }} />

                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
