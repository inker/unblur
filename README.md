# unblur

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

A tool to fix blurry text on WebKit-based browsers. With a given interval, dirty-checks for any elements with on them `translate3d` and replaces it with `translate`.

## Installation
```
npm install --save unblur
```

## Usage
Basic usage:
```javascript
import unblur from 'unblur'

// add this code somewhere around the entry point of your application
// this function can only be called once
unblur()
```
One may also use optional parameters:
```javascript
unblur({
  // the root element which children to unblur (default is document.body)
  element: document.getElementById('foobar'),
  // the interval in ms at which to invoke the unblur function (default is 1000)
  interval: 5000,
  // skip the invocation if the predicate evaluates to true (default is undefined)
  skipIf: () => document.querySelectorAll('[style*="transition"').length > 0,
  // enable for all browsers rather than just desktop Webkit (default is false)
  allBrowsers: true,
  // on unblur
  onUnblur: true,
  // if blurring is skipped
  onSkip: true,
})
```

[npm-url]: https://npmjs.org/package/unblur
[downloads-image]: http://img.shields.io/npm/dm/unblur.svg
[npm-image]: http://img.shields.io/npm/v/unblur.svg
[david-dm-url]:https://david-dm.org/inker/unblur
[david-dm-image]:https://david-dm.org/inker/unblur.svg
[david-dm-dev-url]:https://david-dm.org/inker/unblur#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/inker/unblur/dev-status.svg
