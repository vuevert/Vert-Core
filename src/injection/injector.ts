/*
 * Injector use its own cache system.
 * Provider shipped with cache should be duplicated: it is stored in both "injector cache" and "inject cache".
 * The own cache system is designed for non-caching instance - it will be store in here.
 */

import { TProviders } from '../types/index'
import { InjectionUtils } from '../utils/injection-utils'

class Injector {
  /**
   * Create a new class injector.
   *
   * @param {TProviders} Providers
   * @return {Injector}
   */
  static create (...Providers: TProviders): Injector {
    return new Injector(...Providers)
  }

  private map = new WeakMap()

  /**
   * Get target instance from injector by providing provider.
   *
   * @param {{new(...args): T}} Provider
   * @return {T}
   */
  get <T> (Provider: new (...args) => T): T {
    return this.map.get(Provider)
  }

  /**
   * Whether it holds target provider.
   *
   * @param Provider
   * @return {boolean}
   */
  has (Provider: any): boolean {
    return this.map.has(Provider)
  }

  /**
   * Set a provider instance to cache,
   *
   * @param {{new(...args): T}} Provider
   * @param {T} instance
   */
  set <T> (Provider: new (...args) => T, instance: T) {
    if (!this.has(Provider)) {
      this.map.set(Provider, instance)
    }
  }

  constructor (...Providers: TProviders) {
    Providers.forEach(Provider => {
      this.set(Provider, InjectionUtils.createProviderInstance(Provider))
    })
  }
}

export {
  Injector
}