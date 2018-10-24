import { isDevelopment, log } from './tools.js'

// auto track routes via `page()`
export const onRouteUpdate = ({ location }) => {
  if (!window.analytics || typeof window.analytics.page!=='function') {
    console.warn('Unable to locate analytics.js')
    return
  }
  log(`analytics.page()`, location)
  window.analytics.page()
}
