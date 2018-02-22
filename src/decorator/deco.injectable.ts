/* tslint:disable */

import { TConstructor } from '../types'

const injectableIndicator = '$$isInjectable'
const noCacheIndicator = '$$noCache'

function Injectable (options: IInjectableOptions)
function Injectable (targetClass: TConstructor)
function Injectable (param) {
  if (typeof param === 'function') {
    return exec(param as TConstructor)
  }

  return function (targetClass: TConstructor) {
    exec(targetClass, param)
  }
}

function exec (targetClass, options?: IInjectableOptions) {
  options = options || {
    noCache: false
  }

  Object.defineProperty(targetClass, injectableIndicator, {
    value: true
  })

  Object.defineProperty(targetClass, noCacheIndicator, {
    value: options.noCache
  })
}

export {
  injectableIndicator,
  noCacheIndicator,
  Injectable
}

interface IInjectableOptions {
  noCache: boolean
}
