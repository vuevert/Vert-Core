import { Inject } from '../../../src/decorator'
import { Http } from '../../../src/services'

@Inject(Http)
class Author {
  async fetchList () {
    const { data } = await this.http.get('/api/author-list.json')
    const authorList = data.data
    return authorList
  }

  constructor (private http: Http) {
  }
}

export {
  Author
}
