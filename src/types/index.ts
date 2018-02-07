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
 * Service type.
 */
type TService = new (...args) => any

/**
 * Constructor type.
 */
type TConstructor = new (...args) => any

export {
  TConstructor,
  THookFunction,
  TRootComponent,
  TService
}
