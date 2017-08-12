export interface UnblurOptions {
    interval?: number;
    element?: Element;
    skipIf?: () => boolean;
    log?: boolean;
    allBrowsers?: boolean;
}
declare const _default: (options?: UnblurOptions) => void;
export default _default;
