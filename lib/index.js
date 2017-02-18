"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var defaultUnblurOptions = {
    interval: 1000,
    element: document.body,
    skipIf: undefined,
    log: false,
};
var translate3dRe = /translate3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/i;
var translateReplacer = 'translate($1)';
function fixBlurry(els) {
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var style = els_1[_i].style;
        if (style && style.transform) {
            style.transform = style.transform.replace(translate3dRe, translateReplacer);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) {
    if (options === void 0) { options = {}; }
    var newOptions = __assign({}, defaultUnblurOptions, options);
    var interval = newOptions.interval, element = newOptions.element, skipIf = newOptions.skipIf, log = newOptions.log;
    function foo() {
        if (!skipIf || !skipIf()) {
            var els = document.querySelectorAll('[style*="translate3d"]');
            fixBlurry(els);
        }
        setTimeout(foo, interval);
    }
};
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
//# sourceMappingURL=index.js.map