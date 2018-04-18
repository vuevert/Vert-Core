import { App } from '@vert/core/core'
import RootComponent from './root-component.vue'

const app = new App({
  name: 'service-example',
  rootComponent: RootComponent
})

app.start()
