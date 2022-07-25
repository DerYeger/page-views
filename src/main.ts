export interface Config {
  backendUrl: string
  filter: (page: string) => boolean
  throttle: false | number
  trackPopState: boolean
}

function getLocalStorageKey(page: string) {
  return `eu.yeger.page-views.${page}`
}

// #region config
const defaultConfig: Config = {
  backendUrl: 'https://page-views.up.railway.app/api/views',
  filter: () => true,
  throttle: 5 * 60 * 1000,
  trackPopState: false,
}
// #endregion config

function mergeWithDefaults(config: Partial<Config>): Config {
  return { ...defaultConfig, ...config }
}

function getCurrentPage(): string | undefined {
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    return undefined
  }
  const location = window.location
  const page = `${location.host}${location.pathname}`

  if (page.endsWith('/')) {
    return page.substring(0, page.length - 1)
  }

  return page
}

async function submitView(config: Partial<Config> = {}, page?: string) {
  const resolvedPage = page ?? getCurrentPage()
  if (!resolvedPage) {
    return
  }

  const { backendUrl, filter, throttle } = mergeWithDefaults(config)
  if (!filter(resolvedPage)) {
    return
  }

  if (throttle) {
    const now = Date.now()
    const lastSubmit = localStorage.getItem(getLocalStorageKey(resolvedPage))

    if (lastSubmit !== null && +lastSubmit + throttle > now) {
      // Last submit is too fresh
      return
    }

    localStorage.setItem(getLocalStorageKey(resolvedPage), now.toString())
  }
  try {
    await fetch(`${backendUrl}/${resolvedPage}`, { method: 'POST' })
  } catch (error) {}
}

async function getViews(
  config: Partial<Config> = {},
  page?: string
): Promise<number> {
  const resolvedPage = page ?? getCurrentPage()
  if (!resolvedPage) {
    return 0
  }

  const { backendUrl } = mergeWithDefaults(config)
  const res = await fetch(`${backendUrl}/${resolvedPage}`, { method: 'GET' })
  return +(await res.text())
}

let autoSubmitSetup = false

/**
 * Configure automatic submitting of page views.
 * Note: This modifies the `history.pushState` function.
 */
function autoSubmitViews(config: Partial<Config> = {}) {
  if (typeof window === 'undefined' || typeof history === 'undefined') {
    return
  }

  if (autoSubmitSetup) {
    return
  }
  autoSubmitSetup = true
  const mergedConfig = mergeWithDefaults(config)
  ;(() => {
    const oldPushState = history.pushState
    history.pushState = function pushState(...args) {
      const ret = oldPushState.apply(this, args)
      window.dispatchEvent(new Event('pushstate'))
      window.dispatchEvent(new Event('locationchange'))
      return ret
    }

    if (mergedConfig.trackPopState) {
      window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'))
      })
    }
  })()

  window.addEventListener('locationchange', () => {
    submitView(mergedConfig)
  })

  submitView(mergedConfig)
}

const PageViews = {
  autoSubmitViews,
  getViews,
  submitView,
}

export default PageViews
