import { App, Router } from '../../src/core'

import AuthorPanel from './components/author-panel.vue'
import Welcome from './components/welcome.vue'
import RootComponent from './root-component.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      component: Welcome
    },
    {
      path: '/author',
      component: AuthorPanel
    }
  ]
})

const appIndex = new App({
  element: '#app-index',
  name: 'app-index',
  rootComponent: RootComponent,
  router
})

appIndex.start()
