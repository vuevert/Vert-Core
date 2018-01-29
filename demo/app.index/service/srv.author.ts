import { Inject } from '../../../src/decorator'
import { Http } from '../../../src/services'

@Inject(Http)
class Author {
  async fetchList () {
    console.log('Http service in AuthorList:')
    return ['John Smith', 'Jimmy Parker', 'Eric Cartman', 'LancerComet']
  }

  constructor (private http: Http) {
  }
}

export {
  Author
}
