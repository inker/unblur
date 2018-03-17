// const translate3dRe = /translate3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
// const translateReplacer = 'translate($1)'
// const scale3dRe = /scale3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig
// const scaleReplacer = 'scale($1)'
const RE_3D = /(translate|scale)3d\s*\((.+?,\s*.+?),\s*.+?\s*\)/ig;
const REPLACER_2D = '$1($2)';
export default (els) => {
    for (const { style } of els) {
        if (style && style.transform) {
            style.transform = style.transform.replace(RE_3D, REPLACER_2D);
            // @ts-ignore
            style.willChange = '';
        }
    }
};
//# sourceMappingURL=fixBlurry.js.map