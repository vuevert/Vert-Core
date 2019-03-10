import { globalInjector, registeredProviders } from '../injection/data/internal-injectors'
import { TConstructor, TProvider, TProviders } from '../types'

abstract class InjectionUtils {
  /**
   * Check whether target has been registered.
   *
   * @param target
   * @return {boolean}
   */
  static checkProviderIsRegistered (target: TProvider): boolean {
    return registeredProviders.has(target)
  }

  /**
   * Mark a provider registered.
   *
   * @param Provider
   */
  static registerProvider (Provider: TProvider) {
    registeredProviders.set(Provider, true)
  }

  /**
   * Create a instance of a provider and save to global injector.
   *
   * @param {TProvider} Provider
   * @param {*} instance
   */
  static saveToGlobalInjector (Provider: TProvider, instance?: any) {
    if (!instance) {
      instance = InjectionUtils.createProviderInstance(Provider)
    }
    globalInjector.set(Provider, instance)
  }

  /**
   * Create instance executing function.
   *
   * @param {TConstructor} Provider
   * @param {any[]} args
   * @return {any}
   */
  static createProviderInstance (Provider: TConstructor, args: any[] = []) {
    if (!InjectionUtils.checkProviderIsRegistered(Provider)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[@vert/core] Provider "${Provider.name}" is not registered.`)
      }
      return
    }
    return new Provider(...args)
  }

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
        if (!InjectionUtils.checkProviderIsRegistered(Provider)) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[@vert/core] Provider "${Provider.name}" is not registered.`)
          }
          providers.push(undefined)
          continue
        }

        const instance = globalInjector.get(Provider) || undefined
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
