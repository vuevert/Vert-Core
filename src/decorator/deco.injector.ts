/*
 * Injector use its own cache system.
 * Provider shipped with cache should be duplicated: it is stored in both "injector cache" and "inject cache".
 * The own cache system is designed for non-caching instance - it will be store in here.
 */

import { createProviderInstance, TProviders } from './deco.inject'
import { ProviderCache } from './utils/provider-cache'

class Injector {
  protected providerCache: ProviderCache = new ProviderCache()

  /**
   * Create a new class injector.
   *
   * @param {TProviders} Providers
   * @return {Injector}
   */
  static create (...Providers: TProviders): Injector {
    const injector = new Injector()

    Providers.forEach(Provider => {
      let instance = injector.providerCache.getInstanceFromCache(Provider)
      if (!instance) {
        instance = createProviderInstance(Provider)
        injector.providerCache.saveToCache(Provider, instance)
      }
    })

    return injector
  }

  /**
   * Get target instance from injector by providing provider.
   *
   * @param {{new(...args): T}} Provider
   * @return {T}
   */
  get <T> (Provider: new (...args) => T): T {
    return this.providerCache.getInstanceFromCache(Provider)
  }
}

export {
  Injector
}
