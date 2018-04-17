import { AppComponent, Component } from '@vert/core/app-component'

import { Hero } from '../models/hero'
import { Pothouse } from '../services/pothouse'

@Component
export default class extends AppComponent {
  get heroes (): Hero[] {
    return this.$store.getters.getAllHeroes
  }

  async created () {
    await this.pothouse.findAllHeroes()
  }

  constructor (private pothouse: Pothouse) {
    super()
    console.log(this.pothouse)
  }
}
