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
    const providers = Providers.map(Provider => {
      const providerName = Provider.prototype.constructor.name
      return createProviderInstance(Provider, providerName)
    })
    return createInjectedConstructor(targetClass, ...providers)
  }
}

/**
 * Return a class that has already been injected.
 *
 * @param {*} targetClass
 * @param dependencies
 * @return {*}
 */
function createInjectedConstructor (targetClass: any, ...dependencies): any {
  const Constructor: any = function () {
    return new targetClass(...dependencies)
  }
  Constructor.prototype = targetClass.prototype
  return Constructor
}

export {
  Inject,
  createInjectedConstructor,
  injectFactory
}

/**
 * Inject factory function.
 *
 * @param {T} targetClass
 * @param {any[]} Providers
 * @return {T}
 */
function injectFactory<T extends TConstructor> (
  targetClass: T, Providers: { [name: string]: TConstructor} = {}
): T {
  Object.keys(Providers).forEach(providerName => {
    const Provider = Providers[providerName]
    const callerName = Provider.prototype.constructor.name
    targetClass.prototype[providerName] = createProviderInstance(Provider, callerName)
  })
  return targetClass
}

function createProviderInstance (Provider: TConstructor, callerName: string = '') {
  const provider = new Provider()
  provider['$callerName'] = callerName
  return provider
}

type TConstructor = new (...args) => any
