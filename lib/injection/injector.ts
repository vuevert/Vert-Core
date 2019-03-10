/* tslint:disable:no-shadowed-variable */
import 'reflect-metadata'

import { TConstructor, TProvider, TProviders } from '../types'
import { InjectionUtils } from '../utils/injection-utils'
import { ReflectionUtils } from '../utils/reflection-utils'

/**
 * Standalone injector class.
 */
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

  /**
   * Provider storage.
   */
  private readonly map = new WeakMap()

  /**
   * Create instance.
   *
   * @param {TConstructor} Provider
   * @param {any[]} args
   * @return {any}
   */
  private createProviderInstance (Provider: TConstructor, args: any[] = []) {
    return new Provider(...args)
  }

  addSingleton <T> (Provider: new (...args) => T, instance: T) {
    // TODO: Addsingleton
  }

  /**
   * Get target instance from injector by providing provider.
   *
   * @param {{new(...args): T}} Provider
   * @return {T}
   */
  get <T> (Provider: new (...args) => T): T {
    const injectedDependencies = ReflectionUtils
      .getProvidersFromParams(Provider)

    if (!injectedDependencies.length) {
      return this.map.get(Provider)
    }

    const dependencies = []
    injectedDependencies.forEach(Dependency => {
      dependencies.push(this.get(Dependency))
    })

    return new Provider(...dependencies)
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

  /**
   * Register provider to this injector.
   *
   * @param Provider
   */
  private registerProviders (Provider: TProvider) {
    const injectedDependencies = ReflectionUtils
      .getProvidersFromParams(Provider)

    if (injectedDependencies.length) {
      injectedDependencies.forEach(item => this.registerProviders(item))
    }

    let instance = this.get(Provider)
    if (!instance) {
      instance = new Provider()
      this.set(Provider, instance)
    }
  }

  private constructor (...Providers: TProviders) {
    Providers.forEach(Item => this.registerProviders(Item))
  }
}

export {
  Injector
}
