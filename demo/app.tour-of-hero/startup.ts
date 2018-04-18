import { App } from '@vert/core/core'
import { Pothouse } from './services/pothouse'

const potHouse = new Pothouse()
potHouse['isGlobalSingleton'] = true
App.addSingleton(Pothouse, potHouse)
