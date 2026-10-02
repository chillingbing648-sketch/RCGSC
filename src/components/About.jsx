import { useRef } from 'react'
import Lines from './Lines'
import { useReveal } from '../lib/scroll'
import { content } from '../content'

export default function About() {
  const r = useRef(); useReveal(r)
  return (
    <section className="section about" id="about" ref={r}>
      <p className="meta" data-fade>About</p>
      <Lines className="display-xl" lines={['Students.', 'Serving.', 'Together.']} />
      <p className="about__text" data-fade>{content.about}</p>
    </section>
  )
}
