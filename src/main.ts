export interface Config {
  backendUrl: string
  filter: (page: string) => boolean
  trackPopState: boolean
}

const defaultConfig: Config = {
  backendUrl: 'https://page-views.up.railway.app/api/views',
  filter: () => true,
  trackPopState: false,
}

function getCurrentPage(): string {
  const location = window.location
  const page = `${location.host}${location.pathname}`

  if (page.endsWith('/')) {
    return page.substring(0, page.length - 1)
  }

  return page
}

async function submitView(
  { backendUrl, filter } = defaultConfig,
  page = getCurrentPage()
) {
  if (!filter(page)) {
    return
  }
  try {
    await fetch(`${backendUrl}/${page}`, { method: 'POST' })
  } catch (error) {}
}

async function getViews(
  { backendUrl } = defaultConfig,
  page = getCurrentPage()
): Promise<number> {
  const res = await fetch(`${backendUrl}/${page}`, { method: 'GET' })
  return +(await res.text())
}

let autoSubmitSetup = false

/**
 * Configure automatic submitting of page views.
 * Note: This modifies the `history.pushState` function.
 */
function autoSubmitViews(config = defaultConfig) {
  if (autoSubmitSetup) {
    return
  }
  autoSubmitSetup = true
  ;(() => {
    const oldPushState = history.pushState
    history.pushState = function pushState(...args) {
      const ret = oldPushState.apply(this, args)
      window.dispatchEvent(new Event('pushstate'))
      window.dispatchEvent(new Event('locationchange'))
      return ret
    }

    if (config.trackPopState) {
      window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'))
      })
    }
  })()

  window.addEventListener('locationchange', () => {
    submitView(config)
  })

  submitView(config)
}

const PageViews = {
  autoSubmitViews,
  getViews,
  submitView,
}

export default PageViews
