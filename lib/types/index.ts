import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

/**
 * Root component type.
 */
type TRootComponent<T extends Vue = any, Data = any, Methods = any, Computed = any, Props = any>
  = CombinedVueInstance<T, Data, Methods, Computed, Props>

/**
 * Hook function type.
 */
type THookFunction = (viewModel?: Vue) => void

/**
 * Constructor type.
 */
type TConstructor<T = any> = new (...args: any[]) => T

/**
 * Provider type.
 */
type TProviders = TConstructor[]

export {
  TConstructor,
  THookFunction,
  TRootComponent,
  TProviders
}
