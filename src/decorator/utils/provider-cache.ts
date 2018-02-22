import { TConstructor } from '../../types'
import { getConstructorFromProvider, TProvider } from '../deco.inject'

class ProviderCache {
  protected cache: Array<[TConstructor, any]> = []

  getInstanceFromCache (Provider: TProvider) {
    const [_Provider] = getConstructorFromProvider(Provider)

    for (const item of this.cache) {
      const [$Provider, $instance] = item
      if ($Provider === _Provider) {
        return $instance
      }
    }
  }

  saveToCache (Provider: TProvider, instance: any) {
    const [_Provider] = getConstructorFromProvider(Provider)
    this.cache.push([_Provider, instance])
  }

  checkIfCached (Provider: TProvider) {
    const [_Provider] = getConstructorFromProvider(Provider)
    for (const item of this.cache) {
      const [$Provider] = item
      if ($Provider === _Provider) {
        return true
      }
    }
    return false
  }
}

export {
  ProviderCache
}
