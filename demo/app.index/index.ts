import { App } from '../../src/core'

import RootComponent from './components/root-component.vue'

const appIndex = new App({
  element: '#app-index',
  name: 'app-index',
  rootComponent: RootComponent
})

appIndex.boot()
