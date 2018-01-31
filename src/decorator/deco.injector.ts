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

  // 当 args.length < 1 时使用缓存.
  // if (_args.length < 1) {
  //   const cache = findInstanceFromCache(_Provider)
  //   if (!cache) {
  //     instance = createInstanceCache(_Provider)
  //   }
  // } else {
  //   instance = createInstance(_Provider, _args)
  // }

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
  instance['$providerName'] = Provider.prototype.constructor.name
  return instance
}
