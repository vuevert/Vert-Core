import { Injector } from '../injector'

// Global injector holds all instances which are created and injected manually.
const globalInjector = Injector.create()

// Auto injector holds all instances which are created by vert automatically.
const autoInjector = Injector.create()

// Assign registered providers.
const registeredProviders = Injector.create()

export {
  autoInjector,
  globalInjector,
  registeredProviders
}
