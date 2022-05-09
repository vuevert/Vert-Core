import Vue, { VueConstructor } from 'vue'
import { VueClass } from './declarations'

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
// @ts-ignore
const reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys

export function copyReflectionMetadata (
  to: VueConstructor,
  from: VueClass<Vue>
) {
  forwardMetadata(to, from)

  Object.getOwnPropertyNames(from.prototype).forEach(key => {
    forwardMetadata(to.prototype, from.prototype, key)
  })

  Object.getOwnPropertyNames(from).forEach(key => {
    forwardMetadata(to, from, key)
  })
}

function forwardMetadata (to: object, from: object, propertyKey?: string): void {
  // @ts-ignore
  const metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from)
  metaKeys.forEach(metaKey => {
    // @ts-ignore
    const metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from)

    if (propertyKey) {
      // @ts-ignore
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey)
    } else {
      // @ts-ignore
      Reflect.defineMetadata(metaKey, metadata, to)
    }
  })
}

export {
  reflectionIsSupported
}
