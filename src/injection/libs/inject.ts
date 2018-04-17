import { InjectionUtils } from '../../utils/injection-utils'

/**
 * Inject decorator for class.
 *
 * @description
 * Provide ability to use other class in DI-way.
 *
 * @param Providers
 * @return {(target: any) => any}
 * @constructor
 */
function Inject (...Providers): any {
  return function (targetClass: any) {
    return InjectionUtils.createInjectedConstructor(targetClass, Providers)
  }
}

export {
  Inject,
}
