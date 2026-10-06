import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { pageForPath } from '../routes'

const RouterContext = createContext(null)
const base = import.meta.env.BASE_URL

function readRoute() {
  let path = window.location.pathname
  const basePath = new URL(base, window.location.origin).pathname
  if (path.startsWith(basePath)) path = `/${path.slice(basePath.length)}`
  path = path.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/'
  return pageForPath(path) ? path : '/404'
}

export function hrefForRoute(path) {
  const suffix = path === '/' ? '' : `${path.replace(/^\/+|\/+$/g, '')}/`
  return `${base}${suffix}`
}

export function SiteRouter({ children }) {
  const [route, setRoute] = useState(readRoute)
  const [navigation, setNavigation] = useState({ type: 'initial', scrollY: 0, revision: 0 })
  const revision = useRef(0)
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const currentState = window.history.state && typeof window.history.state === 'object' ? window.history.state : {}
    window.history.replaceState({ ...currentState, route: readRoute(), scrollY: window.scrollY }, '', window.location.href)
    const onPopState = (event) => {
      setRoute(readRoute())
      revision.current += 1
      setNavigation({ type: 'pop', scrollY: Math.max(0, Number(event.state?.scrollY) || 0), revision: revision.current })
    }
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  const navigate = useCallback((path) => {
    const destination = pageForPath(path) ? path : '/404'
    const currentState = window.history.state && typeof window.history.state === 'object' ? window.history.state : {}
    window.history.replaceState({ ...currentState, route: readRoute(), scrollY: window.scrollY }, '', window.location.href)
    window.history.pushState({ route: destination, scrollY: 0 }, '', destination === '/404' ? `${base}404.html` : hrefForRoute(destination))
    setRoute(destination)
    revision.current += 1
    setNavigation({ type: 'push', scrollY: 0, revision: revision.current })
  }, [])
  const value = useMemo(() => ({ route, navigate, navigation }), [route, navigate, navigation])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const value = useContext(RouterContext)
  if (!value) throw new Error('useRouter must be used inside SiteRouter')
  return value
}

export function Link({ to, onClick, children, ...props }) {
  const { navigate } = useRouter()
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank' || props.download) return
    event.preventDefault()
    navigate(to)
  }
  return <a href={hrefForRoute(to)} onClick={handleClick} {...props}>{children}</a>
}
