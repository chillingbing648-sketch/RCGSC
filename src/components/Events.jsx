import { useRef } from 'react'
import Lines from './Lines'
import { useReveal } from '../lib/scroll'
import { content } from '../content'

export default function Events() {
  const r = useRef(); useReveal(r)
  return (
    <section className="section events" id="events" ref={r}>
      <p className="meta" data-fade>Events</p>
      <Lines className="display-xl" lines={['What', 'happens next.']} />
      {content.events.length === 0
        ? <p className="about__text" data-fade>Upcoming events will be announced here.</p>
        : <ul className="evlist">{content.events.map((e, i) => (
            <li key={i} data-fade><span>{e.date}</span><strong>{e.title}</strong><em>{e.place}</em></li>))}</ul>}
    </section>
  )
}
