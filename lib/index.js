"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultUnblurOptions = {
    interval: 1000,
    element: document.body,
    skipIf: undefined,
    log: false,
    allBrowsers: false,
};
// const translate3dRe = /translate3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
// const translateReplacer = 'translate($1)'
// const scale3dRe = /scale3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
// const scaleReplacer = 'scale($1)'
var RE_3D = /(translate|scale)3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig;
var REPLACER_2D = '$1($2)';
function fixBlurry(els) {
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var style = els_1[_i].style;
        if (style && style.transform) {
            style.transform = style.transform.replace(RE_3D, REPLACER_2D);
        }
    }
}
var selector = '[style*="translate3d"], [style*="scale3d"]';
var called = false;
/**
 * Fixes blurry text on WebKit-based browsers. This function can be called only once.
 */
exports.default = function (options) {
    if (options === void 0) { options = {}; }
    if (called) {
        throw new Error('unblur can be called only once!');
    }
    called = true;
    var newOptions = __assign({}, defaultUnblurOptions, options);
    var interval = newOptions.interval, element = newOptions.element, skipIf = newOptions.skipIf, log = newOptions.log, allBrowsers = newOptions.allBrowsers;
    var userAgent = navigator.userAgent;
    var isWebkitDesktop = userAgent.includes('AppleWebKit') && !userAgent.includes('Mobile');
    if (!allBrowsers && !isWebkitDesktop) {
        if (log) {
            console.log('not desktop webkit, do nothing');
        }
        return;
    }
    else if (log) {
        console.log('running unblur');
    }
    var next = interval === 0 ? requestAnimationFrame : function (func) { return setTimeout(func, interval); };
    (function checkAndUnblur() {
        if (!skipIf || !skipIf()) {
            var els = element.querySelectorAll(selector);
            if (els.length > 0) {
                if (log) {
                    console.log('fixing translate3d:', els.length, 'elements');
                }
                fixBlurry(els);
            }
        }
        else if (log) {
            console.log('cancelled');
        }
        next(checkAndUnblur);
    }());
};
//# sourceMappingURL=index.js.map