/* eslint-disable no-redeclare */
import Vue, { ComponentOptions } from 'vue'
import { $internalHooks, componentFactory } from './component'
import { VueClass } from './declarations'

function Component <V extends Vue> (options: ComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC
function Component <VC extends VueClass<Vue>> (target: VC): VC
function Component (options: ComponentOptions<Vue> | VueClass<Vue>): any {
  if (typeof options === 'function') {
    return componentFactory(options)
  }
  return function (Component: VueClass<Vue>) {
    return componentFactory(Component, options)
  }
}

function registerHooks (keys: string[]): void {
  $internalHooks.push(...keys)
}

export { createDecorator, VueDecorator, mixins } from './util'
export {
  Component,
  componentFactory,
  registerHooks
}
