import { Injector } from '../injector'

// Global injector holds all instances which are created and injected manually.
const globalInjector = Injector.create()

// Auto injector holds all instances that are created automatically.
const autoInjector = Injector.create()

export {
  autoInjector,
  globalInjector
}
