import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
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
  useEffect(() => {
    const onPopState = () => setRoute(readRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path) => {
    const destination = pageForPath(path) ? path : '/404'
    window.history.pushState({}, '', destination === '/404' ? `${base}404.html` : hrefForRoute(destination))
    setRoute(destination)
  }, [])
  const value = useMemo(() => ({ route, navigate }), [route, navigate])
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
