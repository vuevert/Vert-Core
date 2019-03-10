/**
 * vue-class-component v6.1.2
 * (c) 2015-2017 Evan You
 * @license MIT
 */

/*tslint:disable*/

import Vue from 'vue'

let hasProto = {__proto__: []} instanceof Array

function createDecorator (factory) {
  return function (target, key, index) {
    let Ctor = typeof target === 'function'
      ? target
      : target.constructor
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }
    if (typeof index !== 'number') {
      index = undefined
    }
    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index)
    })
  }
}

function isPrimitive (value) {
  let type = typeof value
  return value == null || (type !== 'object' && type !== 'function')
}

function warn (message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message)
  }
}

function collectDataFromConstructor (vm, Component) {
  let originalInit = Component.prototype._init
  Component.prototype._init = function () {
    let _this = this
    let keys = Object.getOwnPropertyNames(vm)
    if (vm.$options.props) {
      for (let key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key)
        }
      }
    }
    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get () {
            return vm[key]
          },
          set (value) {
            return vm[key] = value
          },
          configurable: true
        })
      }
    })
  }
  let data = new Component()
  Component.prototype._init = originalInit
  let plainData = {}
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key]
    }
  })
  {
    if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' +
        'when class property is used.')
    }
  }
  return plainData
}

let $internalHooks = [
  'data',
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeDestroy',
  'destroyed',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'render',
  'errorCaptured'
]

function componentFactory (Component, options: any = {}) {
  options.name = options.name || Component._componentTag || Component.name
  let proto = Component.prototype
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return
    }
    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key]
      return
    }
    let descriptor = Object.getOwnPropertyDescriptor(proto, key)
    if (typeof descriptor.value === 'function') {
      (options.methods || (options.methods = {}))[key] = descriptor.value
    } else if (descriptor.get || descriptor.set) {
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      }
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data () {
      return collectDataFromConstructor(this, Component)
    }
  })
  let decorators = Component.__decorators__
  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options)
    })
    delete Component.__decorators__
  }
  let superProto = Object.getPrototypeOf(Component.prototype)
  let Super = superProto instanceof Vue
    ? superProto.constructor
    : Vue
  let Extended = Super.extend(options)
  forwardStaticMembers(Extended, Component, Super)
  return Extended
}

let reservedPropertyNames = [
  'cid',
  'super',
  'options',
  'superOptions',
  'extendOptions',
  'sealedOptions',
  'component',
  'directive',
  'filter'
]

function forwardStaticMembers (Extended, Original, Super) {
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    if (key === 'prototype') {
      return
    }
    let extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key)
    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return
    }
    let descriptor = Object.getOwnPropertyDescriptor(Original, key)
    if (!hasProto) {
      if (key === 'cid') {
        return
      }
      let superDescriptor = Object.getOwnPropertyDescriptor(Super, key)
      if (!isPrimitive(descriptor.value)
        && superDescriptor
        && superDescriptor.value === descriptor.value) {
        return
      }
    }
    if (process.env.NODE_ENV !== 'production'
      && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
        'conflicts with reserved property name of Vue internal. ' +
        'It may cause unexpected behavior of the component. Consider renaming the property.')
    }
    Object.defineProperty(Extended, key, descriptor)
  })
}

function Component (options) {
  if (typeof options === 'function') {
    return componentFactory(options)
  }
  return function (Component) {
    return componentFactory(Component, options)
  }
}

function registerHooks (keys) {
  $internalHooks.push.apply($internalHooks, keys)
}

export {
  Component,
  createDecorator,
  registerHooks,
  componentFactory
}
