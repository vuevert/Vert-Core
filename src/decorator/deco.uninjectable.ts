import { appConfig } from '../config'

const isDev = process.env.NODE_ENV === 'development'

function UnInjectable (target: any) {
  if (isDev) {
    const prototypes = Object.getOwnPropertyNames(target.prototype)
    if (prototypes.length > 1) {
      throw new TypeError(
        `[${appConfig.name}] Class "${target.name}" shouldn't have any prototype property. ` +
        `It's going to be created as a factory.`
      )
    }
  }

  Object.defineProperty(target, '$$isInjectable', {
    value: false
  })
}

export {
  UnInjectable
}
