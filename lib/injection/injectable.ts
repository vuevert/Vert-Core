import { TProvider } from '../types'

const INJECTED_FLAG = 'Vert:Injected'
const INJECTED_PARAMS_METADATA_KEY = 'Vert:ParamTypes'

/**
 * Injectable decorator.
 */
function Injectable (): any {
  return function (Provider: TProvider) {
    const types = Reflect.getMetadata('design:paramtypes', Provider)
    Reflect.defineMetadata(INJECTED_FLAG, true, Provider)
    Reflect.defineMetadata(INJECTED_PARAMS_METADATA_KEY, types, Provider)
  }
}

export {
  Injectable
}
