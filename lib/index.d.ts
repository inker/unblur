export interface UnblurOptions {
    interval?: number;
    element?: Element;
    skipIf?: () => boolean;
    log?: boolean;
    allBrowsers?: boolean;
}
declare var _default: (options?: UnblurOptions) => void;
export default _default;
