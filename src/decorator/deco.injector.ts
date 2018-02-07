import { TConstructor } from '../types'
import { createProviderInstance, getConstructorFromProvider, TProvider, TProviders } from './deco.inject'

class Injector {
  static create (...Providers: TProviders): Injector {
    const injector = new Injector()

    Providers.forEach(Provider => {
      let instance = injector.getInstanceFromCache(Provider)
      if (!instance) {
        instance = createProviderInstance(Provider)
        injector.saveToCache(Provider, instance)
      }
    })

    return injector
  }

  protected cache: Array<[TConstructor, any]> = []

  protected getInstanceFromCache (Provider: TProvider) {
    const [_Provider] = getConstructorFromProvider(Provider)

    for (const item of this.cache) {
      const [$Provider, $instance] = item
      if ($Provider === _Provider) {
        return $instance
      }
    }
  }

  protected saveToCache (Provider: TProvider, instance: any) {
    const [_Provider] = getConstructorFromProvider(Provider)
    this.cache.push([_Provider, instance])
  }

  get <T> (Provider: new (...args) => T): T {
    return this.getInstanceFromCache(Provider as any)
  }
}

export {
  Injector
}
