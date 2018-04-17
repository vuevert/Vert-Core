import { appConfig } from '../../config'
import { TConstructor } from '../../types'
import { injectableIndicator } from './injectable'

const isProd = process.env.NODE_ENV === 'production'

/**
 * Create instance executing function.
 *
 * @param {TConstructor} Provider
 * @param {any[]} args
 * @return {any}
 */
function createInstance (Provider: TConstructor, args: any[] = []) {
  // Target must be signed with "$$isInjectable"
  if (Provider[injectableIndicator] !== true) {
    const errorMsg = `[${appConfig.name}] Class "${Provider.name}" can't be injected because it is non-injectable. ` +
      `Please decorate it with "Service" before injection.`

    if (isProd) {
      return console.error(errorMsg)
    } else {
      throw new TypeError(errorMsg)
    }
  }

  const instance = new Provider(...args)
  Object.defineProperty(instance, '$$providerName', {
    value: Provider.prototype.constructor.name
  })
  return instance
}

export {
  createInstance
}
