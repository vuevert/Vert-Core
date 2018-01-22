import { ReflectiveInjector } from '../../../src/decorator'
import { Http } from '../../../src/services'
import { Author } from './author'

const srvInjector = ReflectiveInjector.resolveAndCreate([
  Author,
  Http
])

export {
  Author,
  srvInjector
}
