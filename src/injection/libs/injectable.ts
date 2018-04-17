import { InjectionUtils } from '../../utils/injection-utils'
import { ReflectionUtils } from '../../utils/reflection-utils'
import { autoInjector, globalInjector } from '../data/internal-injectors'

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

  if (Providers.length) {
    return createNewConstructor(targetClass, Providers)
  }
}

export {
  injectableIndicator,
  Injectable
}

function createNewConstructor (targetClass: any, Providers: any[]) {
  const Constructor = function () {
    const providers = []
    for (const Provider of Providers) {
      let instance = globalInjector.get(Provider) ||
        autoInjector.get(Provider)

      if (!instance && InjectionUtils.checkInjectable(Provider)) {
        instance = InjectionUtils.createProviderInstance(Provider)
        autoInjector.set(Provider, instance)
      }

      providers.push(instance)
    }
    return new targetClass(...providers)
  }

  InjectionUtils.setInjectable(Constructor)

  Constructor.prototype = targetClass.prototype

  Object.defineProperty(Constructor, 'name', {
    writable: true,
    configurable: true,
    value: targetClass.name
  })

  return Constructor
}
