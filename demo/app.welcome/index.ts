import { App } from '../../src/core'
import RootComponent from './root-component.vue'

const app = new App({
  element: '#app-index',
  name: 'app-index',
  rootComponent: RootComponent
})

app.start()
