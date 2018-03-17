import Options from './Options'
import fixBlurry from './fixBlurry'

const defaultUnblurOptions = {
  interval: 1000,
  element: document.body,
  skipIf: undefined,
  onUnblur: undefined,
  onSkip: undefined,
  allBrowsers: false,
}

const SELECTOR = '[style*="translate3d"], [style*="scale3d"], [style*="will-change"]'

let called = false

/**
 * Fixes blurry text on WebKit-based browsers. This function can be called only once.
 */
export default (options: Options = {}) => {
  if (called) {
    throw new Error('unblur can be called only once!')
  }

  called = true

  const newOptions = {
    ...defaultUnblurOptions,
    ...options,
  }

  const {
    interval,
    element,
    skipIf,
    onUnblur,
    onSkip,
    allBrowsers,
  } = newOptions

  const { userAgent } = navigator
  const isWebkitDesktop = userAgent.includes('AppleWebKit') && !userAgent.includes('Mobile')
  if (!allBrowsers && !isWebkitDesktop) {
    console.log('not desktop webkit, do nothing')
    return
  }

  const next = interval === 0 ? requestAnimationFrame : (func) => setTimeout(func, interval)

  ; (function checkAndUnblur() {
    if (!skipIf || !skipIf()) {
      const els = element.querySelectorAll(SELECTOR) as any as HTMLElement[]
      if (els.length > 0) {
        if (onUnblur) {
          onUnblur(els)
        }
        fixBlurry(els)        
      }
    } else if (onSkip) {
      onSkip()
    }
    next(checkAndUnblur)
  }())
}
