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
};
var translate3dRe = /translate3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/i;
function fixBlurry(els) {
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var style = els_1[_i].style;
        if (style && style.transform) {
            style.transform = style.transform.replace(translate3dRe, 'translate($1)');
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) {
    if (options === void 0) { options = {}; }
    options = __assign({}, defaultUnblurOptions, options);
    var skipWhen = options.skipWhen;
    var cb = function (mutations) {
        if (skipWhen && skipWhen()) {
            console.log('cancelling');
            return;
        }
        fixBlurry(mutations.map(function (m) { return m.target; }));
    };
    var onChange = lodash_1.throttle(cb, options.interval);
    var observer = new MutationObserver(onChange);
    var config = {
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
    };
    observer.observe(options.element, config);
};
//# sourceMappingURL=index.js.map