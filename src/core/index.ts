/**
 * Vue Enterprise.
 *
 * @description
 * This is a type of best practice for building a large scale web application which is based on vue.
 * It provides several of APIs and its own design mode that you must obey.
 *
 * @author LancerComet
 * @copyright LancerComet
 * @licence MIT
 */

import 'reflect-metadata'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export { App } from './app'
