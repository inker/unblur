import { throttle } from 'lodash'

export interface UnblurOptions {
    interval?: number,
    element?: Node,
    skipWhen?: () => boolean,
}

const defaultUnblurOptions: UnblurOptions = {
    interval: 1000,
    element: document.body,
    skipWhen: undefined,
}

const translate3dRe = /translate3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/i
const translateReplacer = 'translate($1)'

function fixBlurry(els: HTMLElement[]) {
    for (const { style } of els) {
        if (style && style.transform) {
            style.transform = style.transform.replace(translate3dRe, translateReplacer)
        }
    }
}

const fixMutated = (mutations: MutationRecord[]) => fixBlurry(mutations.map(m => m.target as HTMLElement))

export default (options: UnblurOptions = {}) => {
    const newOptions = { ...defaultUnblurOptions, ...options }
    const { interval, element, skipWhen } = newOptions

    const throttledCallback = throttle(fixMutated, interval)
    const observer = new MutationObserver(mutations => {
        if (skipWhen && skipWhen()) {
            return
        }
        throttledCallback(mutations)
    })
    const config = {
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
    }
    observer.observe(element, config)
}
