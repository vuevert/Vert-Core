import { TProviders } from '../../types'
import { globalInjector } from '../data/global-injector'
import { Injector } from './injector'
import { createInstance } from './utils'

// This ia a local provider cache.
// It only caches the instances which are created by @Inject.
const localProviderCache = Injector.create()

/**
 * Inject decorator for class.
 *
 * @description
 * Provide ability to use other class in DI-way.
 *
 * @param Providers
 * @return {(target: any) => any}
 * @constructor
 */
function Inject (...Providers): any {
  return function (targetClass: any) {
    return createInjectedConstructor(targetClass, Providers)
  }
}

/**
 * Class a class that has already been injected.
 *
 * @param {*} targetClass
 * @param {TProviders} Providers
 * @return {*}
 */
function createInjectedConstructor (targetClass: any, Providers: TProviders): any {
  const providers = []
  Providers.forEach(Provider => {
    let instance = globalInjector.get(Provider) ||
      localProviderCache.get(Provider)
    if (!instance) {
      instance = createInstance(Provider)
      localProviderCache.set(Provider, instance)
    }
    providers.push(instance)
  })
  const Constructor: any = function () {
    return new targetClass(...providers)
  }
  Constructor.prototype = targetClass.prototype
  return Constructor
}

export {
  Inject,
  createInjectedConstructor
}
