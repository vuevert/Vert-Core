import { Injectable } from '@vert/core/injection'
import { Http } from '@vert/core/service'

import { Hero } from '../models/hero'
import { store } from '../store'

@Injectable
class Pothouse {
  async findAllHeroes () {
    const { data } = await this.http.get('/api/hero-list.json')
    const heroes: Hero[] = data.data.map(item => new Hero(item))
    await store.dispatch('setAllHeroes', heroes)
  }

  constructor (
    private http?: Http,
  ) {}
}

export {
  Pothouse
}
