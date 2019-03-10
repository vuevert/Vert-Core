import { Injector } from '../injector'

// Global injector holds all instances which are created and injected manually.
const globalInjector = Injector.create()

// Assign registered providers.
const registeredProviders = Injector.create()

export {
  globalInjector,
  registeredProviders
}
