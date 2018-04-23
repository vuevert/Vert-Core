import { Component } from 'vue'
import { componentFactory } from 'vue-class-component/lib/component'
import { Inject as VueInject, Prop, Provide as VueProvide, Watch } from 'vue-property-decorator'

import { TConstructor, TProviders } from '../types'
import { InjectionUtils } from '../utils/injection-utils'
import { ReflectionUtils } from '../utils/reflection-utils'

let componentId = 1

/**
 * Decorate a class into the component.
 */
function Component (options: IComponentOption): (targetClass: TConstructor) => any
function Component (targetClass: TConstructor): any
function Component (param: any) {
  if (typeof param === 'function') {
    const Providers = ReflectionUtils.getProvidersFromParams(param)
    const Constructor = InjectionUtils.createInjectedConstructor(param, Providers)
    return componentFactory(Constructor, {})
  }

  return function (targetClass: TConstructor) {
    param = param || {}

    const componentName = targetClass.prototype.constructor.name ||
      'AppComponent_' + componentId++

    param = Object.assign({
      name: componentName
    }, param)

    const Providers = ReflectionUtils.getProvidersFromParams(targetClass)
    const Constructor = InjectionUtils.createInjectedConstructor(targetClass, Providers)
    const ComponentConstructor = componentFactory(Constructor, param)
    return ComponentConstructor
  }
}

interface IComponentOption {
  components?: { [key: string]: any  }
  directives?: { [key: string]: any }
  filters?: { [key: string]: typeof Function }
  template?: string
  name?: string

  beforeRouteEnter?: (to: any, form: any, next: any) => void
  beforeRouteLeave?: (to: any, form: any, next: any) => void
  beforeRouteUpdate?: (to: any, form: any, next: any) => void
}

export {
  Component,
  Prop,
  VueInject,
  VueProvide,
  Watch,
  IComponentOption
}
