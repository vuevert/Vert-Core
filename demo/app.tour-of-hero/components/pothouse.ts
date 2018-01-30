import { AppComponent, Component } from '../../../src/app-component'
import { Hero } from '../services/hero'
import { Pothouse } from '../services/pothouse'

@Component({
  providers: [Pothouse]
})
export default class extends AppComponent {
  get heroes (): Hero[] {
    return this.$store.getters.getAllHeroes
  }

  async created () {
    await this.pothouse.findAllHeroes()
  }

  constructor (private pothouse: Pothouse) {
    super()
  }
}
