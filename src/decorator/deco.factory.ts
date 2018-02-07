import { appConfig } from '../config'
import { injectableIndicator } from './deco.injectable'
import {Logger} from "../services";

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

function Factory (target: any) {
  const prototypes = Object.getOwnPropertyNames(target.prototype)
  if (prototypes.length > 1) {
    const errorMsg = `[${appConfig.name}] Class "${target.name}" shouldn't have any prototype property. ` +
      `It's going to be created as a factory.`

    if (isDev) {
      throw new TypeError(errorMsg)
    }

    if (isProd) {

    }
  }

  Object.defineProperty(target, injectableIndicator, {
    value: false
  })
}

export {
  Factory
}
