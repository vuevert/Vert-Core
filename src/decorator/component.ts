import Vue, { ComponentOptions } from 'vue'
import VueComponent from 'vue-class-component'
import { Inject as VueInject } from 'vue-property-decorator'

/**
 * Decorate a class into the component.
 */
function Component (options: ComponentOptions<Vue>): (target: any) => any
function Component (target: new (...args) => any)
function Component (options) {
  return VueComponent(options)
}

/**
 * Inject a service to current component.
 *
 * @param {(string | symbol)} [key]
 * @returns
 */
function Inject (key?: string | symbol) {
  return VueInject(key)
}

export {
  Component,
  Inject
}
