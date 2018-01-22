import 'reflect-metadata'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export { AppComponent } from './component/index'
export { createApp } from './app/index'
export { nextTick } from './utils/next-tick'
