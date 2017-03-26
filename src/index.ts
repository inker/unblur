export interface UnblurOptions {
    interval?: number,
    element?: Element,
    skipIf?: () => boolean,
    log?: boolean,
    allBrowsers?: boolean,
}

const defaultUnblurOptions = {
    interval: 1000,
    element: document.body,
    skipIf: undefined,
    log: false,
    allBrowsers: false,
}

// const translate3dRe = /translate3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
// const translateReplacer = 'translate($1)'
// const scale3dRe = /scale3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
// const scaleReplacer = 'scale($1)'
const re3d = /(translate|scale)3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
const replacer2d = '$1($2)'

function fixBlurry(els: HTMLElement[]) {
    for (const { style } of els) {
        if (style && style.transform) {
            style.transform = style.transform.replace(re3d, replacer2d)
        }
    }
}

const selector = '[style*="translate3d"], [style*="scale3d"]'

let called = false

/**
 * Fixes blurry text on WebKit-based browsers. This function can be called only once.
 */
export default (options: UnblurOptions = {}) => {
    if (called) {
        throw new Error('unblur can be called only once!')
    }
    called = true
    const newOptions = { ...defaultUnblurOptions, ...options }
    const { interval, element, skipIf, log, allBrowsers } = newOptions
    const { userAgent } = navigator
    const isWebkitDesktop = userAgent.includes('AppleWebKit') && !userAgent.includes('Mobile')
    if (!allBrowsers && !isWebkitDesktop) {
        if (log) {
            console.log('not desktop webkit, do nothing')
        }
        return
    } else if (log) {
        console.log('running unblur')
    }

    const next = interval === 0 ? requestAnimationFrame : (func) => setTimeout(func, interval)

    ; (function checkAndUnblur() {
        if (!skipIf || !skipIf()) {
            const els = element.querySelectorAll(selector) as any as HTMLElement[]
            if (els.length > 0) {
                if (log) {
                    console.log('fixing translate3d:', els.length, 'elements')
                }
                fixBlurry(els)                
            }
        } else if (log) {
            console.log('cancelled')
        }
        next(checkAndUnblur)
    }())
}
