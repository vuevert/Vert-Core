import { TProvider } from '../types'
import { InjectionUtils } from '../utils/injection-utils'

/**
 * Injectable decorator.
 */
function Injectable (): any {
  return function (Provider: TProvider) {
    InjectionUtils.registerProvider(Provider)
  }
}

export {
  Injectable
}
