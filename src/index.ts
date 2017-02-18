import { debounce } from 'lodash'

export interface UnblurOptions {
    interval?: number,
    element?: Element,
    skipIf?: () => boolean,
    log?: boolean,
}

const defaultUnblurOptions: UnblurOptions = {
    interval: 1000,
    element: document.body,
    skipIf: undefined,
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

const selector = '[style*="translate3d"]'

export default (options: UnblurOptions = {}) => {
    const newOptions = { ...defaultUnblurOptions, ...options }
    const { interval, element, skipIf, log } = newOptions

    ; (function foo() {
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
        setTimeout(foo, interval)
    }())
}

// debounce()

// export default (options: UnblurOptions = {}) => {
//     const newOptions = { ...defaultUnblurOptions, ...options }
//     const { interval, element, skipIf, log } = newOptions

//     function foo(els: HTMLElement[]) {
//         if (skipIf && skipIf()) {
//             setTimeout(foo, interval, els)
//         } else {
//             fixBlurry(els)
//         }
//     }

//     const fixBlurryThrottled = debounce(fixBlurry, interval)
//     const fixMutated = (mutations: MutationRecord[]) => fixBlurryThrottled(mutations.map(m => m.target as HTMLElement))
//     const observer = new MutationObserver(mutations => {
//         const skip = skipIf && skipIf()
//         if (log) {
//             console.log('elements', mutations.map(m => m.target))
//             if (skip) {
//                 console.log('cancelled')
//             } else {
//                 console.log('fixing blur')
//                 fixMutated(mutations)
//             }
//         } else if (!skip) {
//             fixMutated(mutations)
//         }
//     })
//     const config = {
//         attributes: true,
//         subtree: true,
//         attributeFilter: ['style'],
//     }
//     observer.observe(element, config)
// }
