import { useRef } from 'react'
import Lines from './Lines'
import { useReveal } from '../lib/scroll'
import { Link } from '../lib/router'
import { routes } from '../routes'

export default function HomeLinks() {
  const ref = useRef()
  useReveal(ref)
  return (
    <section className="section home-links" id="explore" ref={ref} aria-label="Explore RCGSC">
      <p className="meta" data-fade>Explore RCGSC</p>
      <Lines className="display-xl" lines={['A year of', 'service in motion.']} />
      <nav aria-label="Explore the club">
        <ul className="home-links__list">
          {routes.filter((page) => page.path !== '/').map((page, i) => (
            <li key={page.path} data-fade>
              <Link to={page.path}>
                <span className="home-links__number">{String(i + 1).padStart(2, '0')}</span>
                <span className="home-links__title">{page.label}</span>
                <span className="home-links__summary">{page.summary}</span>
                <span className="home-links__arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
