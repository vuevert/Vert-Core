import { TProviders } from '../types'

abstract class ReflectionUtils {
  static getProvidersFromParams (target: any): TProviders {
    const result = Reflect.getMetadata('design:paramtypes', target)
    return (result || []).filter((item: any) => {
      return typeof item === 'function' &&
        item !== Object &&
        item !== Function
    })
  }
}

export {
  ReflectionUtils
}
