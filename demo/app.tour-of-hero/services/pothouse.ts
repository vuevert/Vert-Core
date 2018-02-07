import { Inject, Injectable } from '../../../src/decorator'
import { Http } from '../../../src/service'
import { store } from '../store'
import { Hero } from './hero'

@Inject(Http)
@Injectable
class Pothouse {
  async findAllHeroes () {
    const { data } = await this.http.get('/api/hero-list.json')
    const heroes: Hero[] = data.data.map(item => Hero.create(item))
    await store.dispatch('setAllHeroes', heroes)
  }

  constructor (private http: Http) {
  }
}

export {
  Pothouse
}
