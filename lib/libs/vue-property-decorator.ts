/** vue-property-decorator verson 8.0.0 MIT LICENSE copyright 2018 kaorun343 */

/* tslint:disable */

import Vue from 'vue'
import { Component, createDecorator } from './vue-class-component'

export { Component, Vue }

/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
export function Inject (options) {
  return createDecorator(function (componentOptions, key) {
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
export function Provide (key) {
  return createDecorator(function (componentOptions, k) {
    let provide = componentOptions.provide
    if (typeof provide !== 'function' || !provide.managed) {
      const original_1 = componentOptions.provide
      provide = componentOptions.provide = function () {
        const rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null)
        for (const i in provide.managed) {
          rv[provide.managed[i]] = this[i]
        }
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
export function Model (event, options) {
  if (options === void 0) {
    options = {}
  }
  return createDecorator(function (componentOptions, k) {
    (componentOptions.props || (componentOptions.props = {}))[k] = options
    componentOptions.model = {prop: k, event: event || k}
  })
}

/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop (options) {
  if (options === void 0) {
    options = {}
  }
  return createDecorator(function (componentOptions, k) {
    (componentOptions.props || (componentOptions.props = {}))[k] = options
  })
}

/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export function Watch (path, options) {
  if (options === void 0) {
    options = {}
  }
  const _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate,
    immediate = _b === void 0 ? false : _b
  return createDecorator(function (componentOptions, handler) {
    if (typeof componentOptions.watch !== 'object') {
      componentOptions.watch = Object.create(null)
    }
    const watch = componentOptions.watch
    if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]]
    } else if (typeof watch[path] === 'undefined') {
      watch[path] = []
    }
    watch[path].push({handler, deep, immediate})
  })
}

// Code copied from Vue/src/shared/util.js
const hyphenateRE = /\B([A-Z])/g
const hyphenate = function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
export function Emit (event) {
  return function (_target, key, descriptor) {
    key = hyphenate(key)
    const original = descriptor.value
    descriptor.value = function emitter () {
      const _this = this
      const args = []
      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      const emit = function (returnValue) {
        if (returnValue !== undefined) {
          args.unshift(returnValue)
        }
        _this.$emit.apply(_this, [event || key].concat(args))
      }
      const returnValue = original.apply(this, args)
      if (isPromise(returnValue)) {
        returnValue.then(function (returnValue) {
          emit(returnValue)
        })
      } else {
        emit(returnValue)
      }
    }
  }
}

function isPromise (obj) {
  return obj instanceof Promise || (obj && typeof obj.then === 'function')
}
