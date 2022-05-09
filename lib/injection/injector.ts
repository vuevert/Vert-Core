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
      throw new Error(`[@ver/core] "${Provider.name}" is not an injectable class.`)
    }
  }

  /**
   * This map keeps singleton provider and its instance.
   */
  private readonly singletonMap = new WeakMap()

  /**
   * This map keeps transient provider.
   */
  private readonly transient = new WeakMap()

  /**
   * Register instance as a singleton provider in global.
   *
   * @static
   * @template T
   * @param {TConstructor<T>} type - The type to register
   * @param {T} instance - The instance to register for the type
   */
  addSingletonInstance <T> (type: TConstructor<T>, instance: T) {
    if (this.transient.has(type)) {
      throw new Error(`[@vert/core] "${type.name}" has been registered as transient provider.`)
    }

    this.singletonMap.set(type, instance)

    return this
  }

  /**
   * Register target as a singleton provider.
   * You will get the same instance in every single initialization.
   *
   * @param {TConstructor[]} Providers
   */
  addSingleton (...Providers: TConstructor[]): this {
    Providers.forEach(Provider => {
      Injector.checkIsInjected(Provider)

      if (this.transient.has(Provider)) {
        throw new Error(`[@vert/core] "${Provider.name}" has been registered as transient provider.`)
      }

      this.singletonMap.set(Provider, null)
    })

    return this
  }

  /**
   * Register target as a transient provider.
   * You will get different instances in every single initialization.
   *
   * @param {TConstructor[]} Providers
   */
  addTransient (...Providers: TConstructor[]): this {
    Providers.forEach(Provider => {
      Injector.checkIsInjected(Provider)

      if (this.singletonMap.has(Provider)) {
        throw new Error(`[@vert/core] "${Provider.name}" has been registered as singleton provider.`)
      }

      this.transient.set(Provider, null)
    })

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
    const isTransientProvider = this.transient.has(Provider)
    if (!isSingletonProvider && !isTransientProvider) {
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

      case isTransientProvider: {
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
    return this.transient.has(target) || this.singletonMap.has(target)
  }
}

export {
  Injector
}
