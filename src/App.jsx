import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GalaxyBackground from './components/GalaxyBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import CurrentYear from './components/CurrentYear'
import Committee from './components/Committee'
import Avenues from './components/Avenues'
import Journey from './components/Journey'
import Achievement from './components/Achievement'
import Gallery from './components/Gallery'
import Join from './components/Join'
import HomeLinks from './components/HomeLinks'
import Footer from './components/Footer'
import { initScroll, ScrollTrigger, scrollToPosition, env } from './lib/scroll'
import { SiteRouter, Link, useRouter } from './lib/router'
import { pageForPath } from './routes'

function HomePage() {
  return <><Hero /><About /><CurrentYear /><HomeLinks /></>
}

function PageContent({ route }) {
  if (route === '/') return <HomePage />
  if (route === '/committee') return <Committee />
  if (route === '/avenues') return <Avenues />
  if (route === '/journey') return <Journey />
  if (route === '/achievements') return <Achievement />
  if (route === '/gallery') return <Gallery />
  if (route === '/join') return <Join />
  return (
    <section className="section not-found" aria-labelledby="not-found-title">
      <p className="meta">404 · Page not found</p>
      <h1 className="display-xl" id="not-found-title">This page has wandered beyond the galaxy.</h1>
      <Link className="btn" to="/"><span>Return home</span></Link>
    </section>
  )
}

function SiteFrame() {
  const { route, navigation } = useRouter()
  const previousRoute = useRef(route)
  useEffect(() => {
    const stop = initScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => { stop(); window.removeEventListener('load', refresh) }
  }, [])

  useEffect(() => {
    const meta = pageForPath(route)
    const shouldFocusHeading = previousRoute.current !== route
    previousRoute.current = route
    document.title = meta?.title || 'Page not found — RCGSC'
    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = meta?.description || 'The requested page could not be found.'
    if (navigation.type === 'push') scrollToPosition(0)
    const timer = window.setTimeout(() => {
      if (navigation.type === 'pop') scrollToPosition(navigation.scrollY)
      ScrollTrigger.refresh()
      if (shouldFocusHeading) {
        const heading = document.querySelector('.page-route h1, .page-route h2')
        heading?.setAttribute('tabindex', '-1')
        heading?.focus({ preventScroll: true })
      }
    }, navigation.type === 'initial' || env.reduce ? 0 : 280)
    return () => window.clearTimeout(timer)
  }, [route, navigation])

  return (
    <>
      <GalaxyBackground />
      <Navigation />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={route} className="page-route"
            initial={{ opacity: 0, y: env.reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: env.reduce ? 0 : -4 }}
            transition={{ duration: env.reduce ? 0 : .24, ease: [.22, 1, .36, 1] }}>
            <PageContent route={route} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return <SiteRouter><SiteFrame /></SiteRouter>
}
