interface Options {
  interval?: number,
  element?: Element,
  skipIf?: () => boolean,
  log?: boolean,
  onUnblur?: (elements: Element[]) => void,
  onSkip?: () => void,
  allBrowsers?: boolean,
}

export default Options
