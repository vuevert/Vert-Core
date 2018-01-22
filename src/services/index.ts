import { ReflectiveInjector } from '../decorator/deco.injection'
import { Http } from './srv.http'
import { LocalStorage } from './srv.local-storage'

const injector = ReflectiveInjector.resolveAndCreate([
  Http,
  LocalStorage
])

export {
  injector,
  Http,
  LocalStorage
}
