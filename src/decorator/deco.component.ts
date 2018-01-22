import { Component } from 'vue'
import { componentFactory } from 'vue-class-component/lib/component'
import { Inject, Prop, Provide, Watch } from 'vue-property-decorator'
import { AsyncComponent, DirectiveFunction, DirectiveOptions } from 'vue/types/options'
import { Http } from '../services'
import { ReflectiveInjector } from './deco.injection'
import { TService } from '../types'
import ObjectContaining = jasmine.ObjectContaining;

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
    const AppComponent = componentFactory(ComponentConstructor, options)

    // const providers: TService[] = options.providers || []
    // if (providers.length) {
    //   providers.push(Http)
    //   const instances = []
    //   const injector = ReflectiveInjector.resolveAndCreate(providers)
    //   for (const Srv of providers) {
    //     instances.push(injector.get(Srv))
    //   }
    // }

    return AppComponent
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
