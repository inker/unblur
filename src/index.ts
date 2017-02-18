import { debounce } from 'lodash'

export interface UnblurOptions {
    interval?: number,
    element?: Node,
    skipWhen?: () => boolean,
    log?: boolean,
}

const defaultUnblurOptions: UnblurOptions = {
    interval: 1000,
    element: document.body,
    skipWhen: undefined,
    log: false,
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

export default (options: UnblurOptions = {}) => {
    const newOptions = { ...defaultUnblurOptions, ...options }
    const { interval, element, skipWhen, log } = newOptions

    const fixBlurryThrottled = debounce(fixBlurry, interval)
    const fixMutated = (mutations: MutationRecord[]) => fixBlurryThrottled(mutations.map(m => m.target as HTMLElement))
    const observer = new MutationObserver(mutations => {
        const skip = skipWhen && skipWhen()
        if (log) {
            console.log('elements', mutations.map(m => m.target))
            if (skip) {
                console.log('cancelled')
            } else {
                console.log('fixing blur')
                fixMutated(mutations)
            }
        } else if (!skip) {
            fixMutated(mutations)
        }
    })
    const config = {
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
    }
    observer.observe(element, config)
}
