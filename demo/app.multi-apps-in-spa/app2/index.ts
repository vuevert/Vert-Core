import { AppComponent, Component } from '@vert/core/app-component'

@Component
export default class App02 extends AppComponent {
  get name () {
    return this.$store.getters.getName
  }
}
