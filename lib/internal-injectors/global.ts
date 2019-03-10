import { Injector } from '../injection/injector'
import { TProvider } from '../types'

/**
 * Singleton injector holds all singleton instance.
 */
abstract class GlobalInjector {
  private static readonly injector = Injector.create()

  /**
   * Check whether target has been registered.
   *
   * @param target
   * @return {boolean}
   */
  static has (target: TProvider): boolean {
    return GlobalInjector.injector.has(target)
  }

  /**
   * Get target instance from injector by providing provider.
   *
   * @param {{new(...args): T}} Provider
   * @return {T}
   */
  static get <T> (Provider: new (...args) => T): T {
    return GlobalInjector.injector.get(Provider)
  }

  /**
   * Create a instance of a provider and save to global injector.
   *
   * @param {TProvider} Provider
   * @param {*} instance
   */
  static saveToInjector (Provider: TProvider, instance: any) {
    if (!GlobalInjector.has(Provider)) {
      throw new Error(`[@vert/core] Provider "${Provider.name}" is not registered.`)
    }

    if (!instance) {
      throw new TypeError('[@vert/core] Instance must be provided.')
    }

    if (!GlobalInjector.has(Provider)) {
      GlobalInjector.injector.set(Provider, instance)
    }
  }
}

export {
  GlobalInjector
}
