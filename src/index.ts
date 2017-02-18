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

function fixBlurry(els: HTMLElement[]) {
    for (const { style } of els) {
        if (style && style.transform) {
            style.transform = style.transform.replace(translate3dRe, 'translate($1)')
        }
    }
}

export default (options: UnblurOptions = {}) => {
    options = {
        ...defaultUnblurOptions,
        ...options,
    }
    const { skipWhen } = options
    const cb = (mutations: MutationRecord[]) => {
        if (skipWhen && skipWhen()) {
            console.log('cancelling')
            return
        }
        fixBlurry(mutations.map(m => m.target as HTMLElement))
    }
    const onChange = throttle(cb, options.interval)
    const observer = new MutationObserver(onChange)
    const config = {
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
    }
    observer.observe(options.element as Node, config)
}
