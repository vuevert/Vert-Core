import { GlobalInjector } from '../internal-injectors/global'
import { TConstructor, TProviders } from '../types'

abstract class InjectionUtils {
  /**
   * Class a class that has already been injected.
   *
   * @param {*} targetClass
   * @param {TProviders} Providers
   * @return {*}
   */
  static createInjectedConstructor (targetClass: TConstructor, Providers: TProviders): any {
    // Return a new constructor.
    // This new constructor has no params so you can not get any info by using 'design:paramtypes'.
    const Constructor: any = function () {
      const providers = []

      for (const Provider of Providers) {
        if (!GlobalInjector.has(Provider)) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[@vert/core] Provider "${Provider.name}" is not registered.`)
          }
          providers.push(undefined)
          continue
        }

        const instance = GlobalInjector.get(Provider) || undefined
        providers.push(instance)
      }

      return new targetClass(...providers)
    }

    Constructor.prototype = targetClass.prototype

    Object.defineProperty(Constructor, 'name', {
      writable: true,
      configurable: true,
      value: targetClass.name
    })

    return Constructor
  }
}

export {
  InjectionUtils
}
