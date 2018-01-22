import { ReflectiveInjector } from '../../../src/decorator'
import { Http } from '../../../src/services'
import { Author } from './srv.author'

const srvInjector = ReflectiveInjector.resolveAndCreate([
  Author,
  Http
])

export {
  Author,
  srvInjector
}
