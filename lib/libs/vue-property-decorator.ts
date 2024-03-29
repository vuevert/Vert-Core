/** vue-property-decorator verson 8.0.0 MIT LICENSE copyright 2018 kaorun343 */

'use strict'
import Vue, { PropOptions, WatchOptions } from 'vue'
import { InjectKey } from 'vue/types/options'
import { Component, createDecorator, mixins } from './vue-class-component'

export interface Constructor {
  new(...args: any[]): any
}

export { Component, Vue, mixins as Mixins }

/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
export function Inject (options?: { from?: InjectKey, default?: any } | InjectKey): PropertyDecorator {
  return createDecorator((componentOptions, key) => {
    if (typeof componentOptions.inject === 'undefined') {
      componentOptions.inject = {}
    }
    if (!Array.isArray(componentOptions.inject)) {
      componentOptions.inject[key] = options || key
    }
  })
}

/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
export function Provide (key?: string | symbol): PropertyDecorator {
  return createDecorator((componentOptions, k) => {
    let provide: any = componentOptions.provide
    if (typeof provide !== 'function' || !provide.managed) {
      const original = componentOptions.provide
      provide = componentOptions.provide = function (this: any) {
        const rv = Object.create((typeof original === 'function' ? original.call(this) : original) || null)
        for (const i in provide.managed) { rv[provide.managed[i]] = this[i] }
        return rv
      }
      provide.managed = {}
    }
    provide.managed[k] = key || k
  })
}

/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function Model (event?: string, options: (PropOptions | Constructor[] | Constructor) = {}): PropertyDecorator {
  return createDecorator((componentOptions, k) => {
    (componentOptions.props || (componentOptions.props = {}) as any)[k] = options
    componentOptions.model = { prop: k, event: event || k }
  })
}

/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop (options: (PropOptions | Constructor[] | Constructor) = {}): PropertyDecorator {
  return createDecorator((componentOptions, k) => {
    (componentOptions.props || (componentOptions.props = {}) as any)[k] = options
  })
}

/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export function Watch (path: string, options: WatchOptions = {}): MethodDecorator {
  const { deep = false, immediate = false } = options

  return createDecorator((componentOptions, handler) => {
    if (typeof componentOptions.watch !== 'object') {
      componentOptions.watch = Object.create(null)
    }

    const watch: any = componentOptions.watch

    if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]]
    } else if (typeof watch[path] === 'undefined') {
      watch[path] = []
    }

    watch[path].push({ handler, deep, immediate })
  })
}

// Code copied from Vue/src/shared/util.js
const hyphenateRE = /\B([A-Z])/g
const hyphenate = (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase()

/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
export function Emit (event?: string): MethodDecorator {
  return function (_target: Vue, key: string, descriptor: any) {
    key = hyphenate(key)
    const original = descriptor.value
    descriptor.value = function emitter (...args: any[]) {
      const emit = (returnValue: any) => {
        if (returnValue !== undefined) { args.unshift(returnValue) }
        this.$emit(event || key, ...args)
      }

      const returnValue: any = original.apply(this, args)

      if (isPromise(returnValue)) {
        returnValue.then(returnValue => {
          emit(returnValue)
        })
      } else {
        emit(returnValue)
      }
    }
  }
}

function isPromise (obj: any): obj is Promise<any> {
  return obj instanceof Promise || (obj && typeof obj.then === 'function')
}
