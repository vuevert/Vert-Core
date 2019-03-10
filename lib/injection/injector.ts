import { TConstructor } from '../types'
import { ReflectionUtils } from '../utils/reflection-utils'
import { checkIsInjected } from './injectable'

/**
 * Standalone injector class.
 */
class Injector {
  /**
   * Create a new class injector.
   *
   * @return {Injector}
   */
  static create (): Injector {
    return new Injector()
  }

  /**
   * Check whether a class is injected.
   *
   * @param Provider
   */
  private static checkIsInjected (Provider: TConstructor) {
    if (!checkIsInjected(Provider)) {
      throw new Error(`[@ver/core] "${Provider.name}" is not an injected class.`)
    }
  }

  /**
   * This map keeps singleton provider and its instance.
   */
  private readonly singletonMap = new WeakMap()

  /**
   * This map keeps scoped provider.
   */
  private readonly scopedMap = new WeakMap()

  /**
   * Register target as singleton provider.
   *
   * @param {TConstructor} Provider
   */
  addSingleton (Provider: TConstructor): this {
    Injector.checkIsInjected(Provider)

    if (this.scopedMap.has(Provider)) {
      throw new Error(`[@vert/core] "${Provider.name}" has been registered as scoped provider.`)
    }

    this.singletonMap.set(Provider, null)
    return this
  }

  /**
   * Register target as scoped provider.
   *
   * @param {TConstructor} Provider
   */
  addScoped <T> (Provider: TConstructor): this {
    Injector.checkIsInjected(Provider)

    if (this.singletonMap.has(Provider)) {
      throw new Error(`[@vert/core] "${Provider.name}" has been registered as singleton provider.`)
    }

    this.scopedMap.set(Provider, null)
    return this
  }

  /**
   * Get target instance from injector by providing provider.
   *
   * @param {{new(...args): T}} Provider
   * @return {T}
   */
  get <T> (Provider: new (...args) => T): T {
    const isSingletonProvider = this.singletonMap.has(Provider)
    const isScopedProvider = this.scopedMap.has(Provider)
    if (!isSingletonProvider && !isScopedProvider) {
      return null
    }

    switch (true) {
      case isSingletonProvider: {
        let instance = this.singletonMap.get(Provider)
        if (!instance) {
          const dependencyInstance = ReflectionUtils
            .getProvidersFromParams(Provider)
            .map(item => this.get(item))
          instance = new Provider(...dependencyInstance)
          this.singletonMap.set(Provider, instance)
        }
        return instance
      }

      case isScopedProvider: {
        const dependencyInstance = ReflectionUtils
          .getProvidersFromParams(Provider)
          .map(item => this.get(item))
        const instance = new Provider(...dependencyInstance)
        return instance
      }

      default:
        return null
    }
  }

  /**
   * Check whether injector has registered this provider.
   *
   * @param target
   */
  has (target: TConstructor): boolean {
    return this.scopedMap.has(target) || this.singletonMap.has(target)
  }

  private constructor () {
  }
}

export {
  Injector
}
