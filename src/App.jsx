import { useEffect } from 'react'
import GalaxyBackground from './components/GalaxyBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import CurrentYear from './components/CurrentYear'
import Avenues from './components/Avenues'
import Journey from './components/Journey'
import Achievement from './components/Achievement'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Join from './components/Join'
import Footer from './components/Footer'
import { initScroll, ScrollTrigger } from './lib/scroll'

export default function App() {
  useEffect(() => {
    const stop = initScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => { stop(); window.removeEventListener('load', refresh) }
  }, [])
  return (
    <>
      <GalaxyBackground />
      <Navigation />
      <main>
        <Hero /><About /><CurrentYear /><Avenues /><Journey /><Achievement /><Events /><Gallery /><Join />
      </main>
      <Footer />
    </>
  )
}
