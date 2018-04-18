import { AppComponent, Component } from '@vert/core/app-component'

@Component({
  beforeRouteEnter (to, from, next) {
    const path = from.path
    next(path !== '/pothouse' ? '/pothouse' : undefined)
  }
})
export default class HeroComponent extends AppComponent {
  get heroName () {
    return this.$route.params.name
  }

  get hero () {
    const allHeroes = this.$store.getters.getAllHeroes
    return allHeroes.filter(item => item.name === this.heroName)[0]
  }

  async created () {
    console.log(this.heroName)
  }
}
