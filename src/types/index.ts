/**
 * Root component type.
 */
import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

type TRootComponent = CombinedVueInstance<any, any, any, any, any>

/**
 * Hook function type.
 */
type THookFunction = (viewModel?: Vue) => void

/**
 * Service type.
 */
type TService = new (...args) => any

export {
  THookFunction,
  TRootComponent,
  TService
}
