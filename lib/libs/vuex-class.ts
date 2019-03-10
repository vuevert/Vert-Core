/*!
 * vuex-class v0.3.1
 * https://github.com/ktsn/vuex-class
 *
 * @license
 * Copyright (c) 2017 katashin
 * Released under the MIT license
 * https://github.com/ktsn/vuex-class/blob/master/LICENSE
 */

/* tslint:disable */

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { createDecorator } from './vue-class-component'

let State = createBindingHelper('computed', mapState)
let Getter = createBindingHelper('computed', mapGetters)
let Action = createBindingHelper('methods', mapActions)
let Mutation = createBindingHelper('methods', mapMutations)

function namespace(namespace, helper) {
  function createNamespacedHelper(helper) {
    function namespacedHelper(a, b) {
      if (typeof b === 'string') {
        let key = b
        let proto = a
        return helper(key, {namespace})(proto, key)
      }
      let type = a
      let options = merge(b || {}, {namespace})
      return helper(type, options)
    }

    return namespacedHelper
  }

  if (helper) {
    console.warn('[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead.')
    return createNamespacedHelper(helper)
  }
  return {
    State: createNamespacedHelper(State),
    Getter: createNamespacedHelper(Getter),
    Mutation: createNamespacedHelper(Mutation),
    Action: createNamespacedHelper(Action)
  }
}

function createBindingHelper(bindTo, mapFn) {
  function makeDecorator(map, namespace) {
    return createDecorator(function (componentOptions, key) {
      if (!componentOptions[bindTo]) {
        componentOptions[bindTo] = {}
      }
      // @ts-ignore
      let mapObject = (_a = {}, _a[key] = map, _a)
      componentOptions[bindTo][key] = namespace !== undefined
        ? mapFn(namespace, mapObject)[key]
        : mapFn(mapObject)[key]
      let _a
    })
  }

  function helper(a, b) {
    if (typeof b === 'string') {
      let key = b
      let proto = a
      // @ts-ignore
      return makeDecorator(key, undefined)(proto, key)
    }
    let namespace = extractNamespace(b)
    let type = a
    return makeDecorator(type, namespace)
  }

  return helper
}

function extractNamespace(options) {
  let n = options && options.namespace
  if (typeof n !== 'string') {
    return undefined
  }
  if (n[n.length - 1] !== '/') {
    return n + '/'
  }
  return n
}

function merge(a, b) {
  let res = {};
  [a, b].forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      res[key] = obj[key]
    })
  })
  return res
}

export {
  State,
  Getter,
  Action,
  Mutation,
  namespace
}
