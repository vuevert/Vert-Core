import { Injector } from '../injection/injector'
import { TConstructor } from '../types'

/**
 * Singleton injector holds all singleton instance.
 */
abstract class GlobalInjector {
  private static readonly injector = Injector.create()

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
   * Register target as singleton provider into global injector.
   *
   * @param Providers
   */
  static addSingleton (...Providers: TConstructor[]) {
    GlobalInjector.injector.addSingleton(...Providers)
  }

  /**
   * Register target as scoped provider into global injector.
   *
   * @param Providers
   */
  static addScoped (...Providers: TConstructor[]) {
    GlobalInjector.injector.addScoped(...Providers)
  }

  /**
   * Check whether injector has registered this provider.
   *
   * @param Provider
   */
  static has (Provider: TConstructor) {
    return GlobalInjector.injector.has(Provider)
  }
}

export {
  GlobalInjector
}
