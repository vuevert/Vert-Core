import 'babel-polyfill'

import { App } from '@vert/core/core'
import Router from 'vue-router'

import './startup'

import Hero from './components/hero.vue'
import Pothouse from './components/pothouse.vue'
import Welcome from './components/welcome.vue'
import RootComponent from './root-component.vue'

import { store } from './store'

const router = new Router({
  routes: [
    {
      path: '/',
      component: Welcome
    }, {
      path: '/hero/:name',
      component: Hero
    }, {
      path: '/pothouse',
      component: Pothouse
    }
  ]
})

const app = new App({
  element: '#app-tour-of-hero',
  name: 'tour-of-hero',
  rootComponent: RootComponent,
  router,
  store
})

app.start()
