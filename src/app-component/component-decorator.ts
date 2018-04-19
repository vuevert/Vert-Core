import { Component } from 'vue'
import { componentFactory } from 'vue-class-component/lib/component'
import { Inject as VueInject, Prop, Provide as VueProvide, Watch } from 'vue-property-decorator'

import { TProviders } from '../types'
import { InjectionUtils } from '../utils/injection-utils'
import { ReflectionUtils } from '../utils/reflection-utils'

let defaultComponentID = 1

/**
 * Decorate a class into the component.
 */
function Component (options: IComponentOption): (target: any) => any
function Component (targetClass: new (...args) => any)
function Component (options) {
  if (typeof options === 'function') {
    const Providers = ReflectionUtils.getProvidersFromParams(options)
    const Constructor = InjectionUtils.createInjectedConstructor(options, Providers)
    return componentFactory(Constructor, {})
  }

  return function (targetClass) {
    options = options || {}

    const componentName = targetClass.prototype.constructor.name ||
      'AppComponent_' + defaultComponentID++

    options = Object.assign({
      name: componentName
    }, options)

    const Providers = (options as IComponentOption).providers ||
      ReflectionUtils.getProvidersFromParams(targetClass)

    const Constructor = InjectionUtils.createInjectedConstructor(targetClass, Providers)
    const ComponentConstructor = componentFactory(Constructor, options)
    return ComponentConstructor
  }
}

interface IComponentOption {
  components?: { [key: string]: any  }
  directives?: { [key: string]: any }
  filters?: { [key: string]: typeof Function }
  template?: string
  name?: string
  providers?: TProviders

  beforeRouteEnter?: any
  beforeRouteLeave?: any
  beforeRouteUpdate?: any
}

export {
  Component,
  Prop,
  VueInject,
  VueProvide,
  Watch,
  IComponentOption
}
