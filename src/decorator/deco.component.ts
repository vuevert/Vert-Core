import { Component } from 'vue'
import { componentFactory } from 'vue-class-component/lib/component'
import { Inject, Prop, Provide, Watch } from 'vue-property-decorator'
import { AsyncComponent, DirectiveFunction, DirectiveOptions } from 'vue/types/options'

/**
 * Decorate a class into the component.
 */
function Component (options: IComponentOption): (target: any) => any
function Component (target: new (...args) => any)
function Component (options) {
  if (typeof options === 'function') {
    return componentFactory(options)
  }

  return function (ComponentConstructor) {
    return componentFactory(ComponentConstructor, options)
  }
}

interface IComponentOption {
  components?: { [key: string]: Component<any, any, any, any> | AsyncComponent<any, any, any, any> }
  directives?: { [key: string]: DirectiveFunction | DirectiveOptions }
  filters?: { [key: string]: typeof Function }
  template?: string
  name?: string
  // providers?: TService[]
}

export {
  Component,
  Inject,
  Prop,
  Provide,
  Watch
}
