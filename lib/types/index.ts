import Vue, { Component } from 'vue'

/**
 * Root component type.
 */
type TRootComponent = Component

/**
 * Hook function type.
 */
type THookFunction = (viewModel?: Vue) => void

/**
 * Constructor type.
 */
type TConstructor = new (...args: any[]) => any

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
