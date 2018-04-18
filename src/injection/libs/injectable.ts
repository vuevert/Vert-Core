import { InjectionUtils } from '../../utils/injection-utils'
import { ReflectionUtils } from '../../utils/reflection-utils'

const injectableIndicator = '$$isInjectable'

/**
 * Injectable decorator.
 *
 * @param targetClass
 * @return {any}
 * @constructor
 */
function Injectable (targetClass: any): any {
  InjectionUtils.setInjectable(targetClass)
  const Providers = ReflectionUtils.getProvidersFromParams(targetClass)
  return InjectionUtils.createInjectedConstructor(targetClass, Providers)
}

export {
  injectableIndicator,
  Injectable
}
