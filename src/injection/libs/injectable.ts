/* tslint:disable */

import { TConstructor } from '../../types'

const injectableIndicator = '$$isInjectable'

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
  options = options || {}

  Object.defineProperty(targetClass, injectableIndicator, {
    value: true
  })
}

export {
  injectableIndicator,
  Injectable
}

interface IInjectableOptions {
}
