import { Component } from 'vue'
import { componentFactory } from 'vue-class-component/lib/component'
import { Inject, Prop, Provide, Watch } from 'vue-property-decorator'
import { AsyncComponent, DirectiveFunction, DirectiveOptions } from 'vue/types/options'
import { createInjectedConstructor } from '../decorator/deco.injector'

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

    const dependencies = (
      (options as IComponentOption).providers || []
    ).map(Provider => new Provider())

    const Constructor = createInjectedConstructor(targetClass, ...dependencies)

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
  providers?: any[]
}

export {
  Component,
  Inject,
  Prop,
  Provide,
  Watch
}
