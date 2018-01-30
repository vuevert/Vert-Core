import { Inject } from '../../../src/decorator'
import { Http } from '../../../src/services'
import { store } from '../store'
import { Hero } from './hero'

@Inject(Http)
class Pothouse {
  async findAllHeroes () {
    const { data } = await this.http.get('/api/hero-list.json')
    const heroes: Hero[] = data.data
    await store.dispatch('setAllHeroes', heroes)
  }

  constructor (private http: Http) {
  }
}

export {
  Pothouse
}
