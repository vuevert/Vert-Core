import { VueEnterprise } from '../../src'

import { AuthorList } from './service/author-list'
import View from './view/index.vue'

const indexApp = VueEnterprise.createAppPage({
  element: '#index-app',
  name: 'index-app',
  rootComponent: View,
  services: [AuthorList]
})

indexApp.boot()
