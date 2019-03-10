/* tslint:disable */

import { TProviders } from '../types'

abstract class ReflectionUtils {
  static getProvidersFromParams (target: any): TProviders {
    return (
      Reflect['getMetadata']('design:paramtypes', target) || []
    ).filter((item: any) => {
      return typeof item === 'function' &&
        item !== Object &&
        item !== Function
    })
  }
}

export {
  ReflectionUtils
}
