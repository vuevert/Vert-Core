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
    const providers = Providers.map(Item => new Item())
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
    targetClass.prototype[providerName] = new Providers[providerName]()
  })
  return targetClass
}

type TConstructor = new (...args) => any
