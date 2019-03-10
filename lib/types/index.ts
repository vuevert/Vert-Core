import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

/**
 * Root component type.
 */
type TRootComponent = CombinedVueInstance<any, any, any, any, any>

/**
 * Hook function type.
 */
type THookFunction = (viewModel?: Vue) => void

/**
 * Constructor type.
 */
type TConstructor = new (...args: any[]) => any

/**
 * Service type.
 */
type TService = TConstructor

/**
 * Provider type.
 */
type TProvider = TConstructor
type TProviders = TProvider[]

export {
  TConstructor,
  THookFunction,
  TRootComponent,
  TService,
  TProvider,
  TProviders
}
