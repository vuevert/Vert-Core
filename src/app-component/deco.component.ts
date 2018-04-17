import { componentFactory } from 'vue-class-component/lib/component'
import { Inject as VueInject, Prop, Provide as VueProvide, Watch } from 'vue-property-decorator'
import { AsyncComponent, DirectiveFunction, DirectiveOptions } from 'vue/types/options'
import { NavigationGuard } from '../core/core.router'
import { Component } from '../core/core.vue'
import { createInjectedConstructor, TProviders } from '../injection/libs/inject'

let defaultComponentID = 1

/**
 * Decorate a class into the component.
 */
function Component (options: IComponentOption): (target: any) => any
function Component (targetClass: new (...args) => any)
function Component (options) {
  if (typeof options === 'function') {
    return componentFactory(options)
  }

  return function (targetClass) {
    const componentName = targetClass.prototype.constructor.name || 'AppComponent_' + defaultComponentID++
    options = Object.assign({
      name: componentName
    }, (options || {}))

    const Providers = (options as IComponentOption).providers || []

    const Constructor = createInjectedConstructor(targetClass, Providers)
    const ComponentConstructor = componentFactory(Constructor, options)
    return ComponentConstructor
  }
}

interface IComponentOption {
  components?: { [key: string]: Component<any, any, any, any> | AsyncComponent<any, any, any, any> }
  directives?: { [key: string]: DirectiveFunction | DirectiveOptions }
  filters?: { [key: string]: typeof Function }
  template?: string
  name?: string
  providers?: TProviders

  beforeRouteEnter?: NavigationGuard
  beforeRouteLeave?: NavigationGuard
  beforeRouteUpdate?: NavigationGuard
}

export {
  Component,
  Prop,
  VueInject,
  VueProvide,
  Watch
}
