export interface UnblurOptions {
    interval?: number;
    element?: Node;
    skipWhen?: () => boolean;
    log?: boolean;
}
declare var _default: (options?: UnblurOptions) => void;
export default _default;
