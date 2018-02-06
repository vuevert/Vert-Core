import { appConfig } from '../config'

const instanceCache = []

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
  const providers = Providers.map(createProviderInstance)
  const Constructor: any = function () {
    return new targetClass(...providers)
  }
  Constructor.prototype = targetClass.prototype
  return Constructor
}

/**
 * Inject factory function.
 *
 * @param {T} targetClass
 * @param {any[]} Providers
 * @return {T}
 */
function injectFactory<T extends TConstructor> (
  targetClass: T,
  Providers: { [name: string]: TProvider } = {}
): T {
  Object.keys(Providers).forEach(providerName => {
    const Provider = Providers[providerName]
    targetClass.prototype[providerName] = createProviderInstance(Provider)
  })
  return targetClass
}

/**
 * Create provider instance.
 *
 * @param {TProvider} Provider
 * @return {any}
 */
function createProviderInstance (Provider: TProvider) {
  let _Provider = null
  let _args = []

  if (Array.isArray(Provider)) {
    _Provider = Provider[0]
    _args = Provider[1]
  } else {
    _Provider = Provider
  }

  if (process.env.NODE_ENV === 'development') {
    if (_Provider['$$isInjectable'] !== true) {
      throw new TypeError(
        `[${appConfig.name}] Class "${_Provider.name}" can't be injected because it is non-injectable. ` +
        `Please decorate it with "Service" before injection.`
      )
    }
  }

  const instance = createInstance(_Provider, _args)
  return instance
}

type TConstructor = new (...args) => any
type TProvider = TConstructor | [TConstructor, any[]]
type TProviders = TProvider[]

export {
  Inject,
  createInjectedConstructor,
  createProviderInstance,
  injectFactory,
  TConstructor,
  TProviders
}

function findInstanceFromCache (Provider: TConstructor) {
  for (const cacheItem of instanceCache) {
    const [Constructor, cache] = cacheItem
    if (Constructor === Provider) {
      return cache
    }
  }
}

function createInstanceCache (Provider: TConstructor) {
  const instance = new Provider()
  const cacheItem = [Provider, instance]
  instanceCache.push(cacheItem)
  return instance
}

function createInstance (Provider: TConstructor, args: any[]) {
  const instance = new Provider(...args)
  Object.defineProperty(instance, '$$providerName', {
    value: Provider.prototype.constructor.name
  })
  return instance
}
