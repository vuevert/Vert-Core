import { TConstructor } from '../types'

const INJECTED_FLAG = 'Vert:Injected'
const INJECTED_PARAMS_METADATA_KEY = 'Vert:ParamTypes'

/**
 * Injectable decorator.
 */
function Injectable (): any {
  return function (Provider: TConstructor) {
    // @ts-ignore
    const types = Reflect.getMetadata('design:paramtypes', Provider)
    // @ts-ignore
    Reflect.defineMetadata(INJECTED_FLAG, true, Provider)
    // @ts-ignore
    Reflect.defineMetadata(INJECTED_PARAMS_METADATA_KEY, types, Provider)
  }
}

/**
 * Check whether a class is injected.
 *
 * @param target
 */
function checkIsInjected (target: TConstructor): boolean {
  // @ts-ignore
  return Reflect.getMetadata(INJECTED_FLAG, target) === true
}

export {
  Injectable,
  checkIsInjected
}
