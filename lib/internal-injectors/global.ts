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
   * @param Provider
   */
  static addSingleton (Provider: TConstructor) {
    GlobalInjector.injector.addSingleton(Provider)
  }

  /**
   * Register target as scoped provider into global injector.
   *
   * @param Provider
   */
  static addScoped (Provider: TConstructor) {
    GlobalInjector.injector.addScoped(Provider)
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
