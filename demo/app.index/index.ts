import { createApp } from '../../src/core'

import View from './view/index.vue'

const indexApp = createApp({
  element: '#app-index',
  name: 'app-index',
  rootComponent: View
})

indexApp.boot()
