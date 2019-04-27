import Vue, { Component, ComponentOptions } from 'vue'
import { Inject as VueInject, Prop, Provide as VueProvide, Watch } from 'vue-property-decorator'
import { componentFactory } from '../libs/vue-class-component'
import { registerHooks } from '../libs/vue-class-component'

import { TConstructor } from '../types'
import { InjectionUtils } from '../utils/injection-utils'
import { ReflectionUtils } from '../utils/reflection-utils'

let componentId = 1

// Nuxt support.
registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
  'asyncData',
  'fetch',
  'head',
  'layout',
  'meta',
  'middleware',
  'title',
  'transition',
  'scrollToTop',
  'validate'
])

/**
 * Decorate a class into the component.
 */
function Component <V extends Vue> (options: ComponentOptions<V> & ThisType<V>)
  : <VC extends VueClass<V>>(target: VC) => VC
function Component<VC extends VueClass<Vue>> (targetClass: VC): VC
function Component (param: any): any {
  if (typeof param === 'function') {
    const Providers = ReflectionUtils.getProvidersFromParams(param)
    const Constructor = InjectionUtils.createInjectedConstructor(param, Providers)

    // Keep targetClass.__decorators__.
    // "__decorators__" is defined in vue-class-component, and it holds all customized decorators' data
    // such as @Prop, @Watch, .ect.
    keepDecorators(param, Constructor)

    return componentFactory(Constructor, {})
  }

  return function (targetClass: TConstructor) {
    param = param || {}

    const componentName = targetClass.prototype.constructor.name ||
      'AppComponent-' + componentId++

    param = Object.assign({
      name: componentName
    }, param)

    const Providers = ReflectionUtils.getProvidersFromParams(targetClass)
    const Constructor = InjectionUtils.createInjectedConstructor(targetClass, Providers)

    keepDecorators(targetClass, Constructor)

    const ComponentConstructor = componentFactory(Constructor, param)
    return ComponentConstructor
  }
}

/**
 * Function to keep targetClass.__decorators__.
 * "__decorators__" is defined in vue-class-component, and it holds all customized decorators' data
 * such as @Prop, @Watch, .ect.
 *
 * @link https://github.com/vuejs/vue-class-component/blob/master/src/component.ts#L59
 *
 * @param {*} targetClass
 * @param {*} Constructor
 */
function keepDecorators (targetClass: any, Constructor: any) {
  if (targetClass.__decorators__) {
    Constructor.__decorators__ = targetClass.__decorators__
  }
}

export {
  Component,
  Prop,
  VueInject,
  VueProvide,
  Watch
}

type VueClass<T> = new (...args: any[]) => T & Vue
