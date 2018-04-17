import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'

import { App } from '@vert/core/core'
import App01 from './app1/index.vue'
import App02 from './app2/index.vue'

Vue.use(Vuex)

const app01 = new App({
  element: '#app-01',
  name: 'app-01',
  rootComponent: App01,
  store: new Vuex.Store({
    state: { name: 'App 01' },
    getters: {
      getName (state) { return state.name }
    }
  })
})

const app02 = new App({
  element: '#app-02',
  name: 'app-02',
  rootComponent: App02,
  store: new Vuex.Store({
    state: { name: 'App 02' },
    getters: {
      getName (state) { return state.name }
    }
  })
})

app01.start()
setTimeout(() => app02.start(), 500)
