"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var lodash_1 = require("lodash");
var defaultUnblurOptions = {
    interval: 1000,
    element: document.body,
    skipWhen: undefined,
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
    var interval = newOptions.interval, element = newOptions.element, skipWhen = newOptions.skipWhen, log = newOptions.log;
    var fixBlurryThrottled = lodash_1.debounce(fixBlurry, interval);
    var fixMutated = function (mutations) { return fixBlurryThrottled(mutations.map(function (m) { return m.target; })); };
    var observer = new MutationObserver(function (mutations) {
        if (!skipWhen || !skipWhen()) {
            if (log) {
                console.log('fixing mutated');
            }
            fixMutated(mutations);
        }
        else if (log) {
            console.log('cancelled');
        }
    });
    var config = {
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
    };
    observer.observe(element, config);
};
//# sourceMappingURL=index.js.map