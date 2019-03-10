import { GlobalInjector } from '../internal-injectors/global'
import { TConstructor, TProviders } from '../types'
import { Logger } from './logger'

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
      Providers.forEach(Provider => {
        if (!GlobalInjector.has(Provider)) {
          Logger.warn(`Provider "${Provider.name}" hasn't been registered in global.`)
          providers.push(undefined)
          return
        }

        const instance = GlobalInjector.get(Provider)
        providers.push(instance)
      })

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
