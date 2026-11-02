// Sends a Google Analytics 4 event. The gtag snippet lives in index.html.
export function track(name, params = {}) {
  window.gtag?.('event', name, params)
}
