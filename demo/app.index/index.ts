import { VueEnterprise } from '../../src'

import { AuthorList } from './service/author-list'
import View from './view.vue'

const indexApp = VueEnterprise.createAppPage({
  element: '#index-app',
  name: 'index',
  rootComponent: View,
  services: [AuthorList]
})

indexApp.boot()
