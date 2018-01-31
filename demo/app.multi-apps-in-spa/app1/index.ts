import { AppComponent, Component } from '../../../src/app-component'

@Component
export default class App01 extends AppComponent {
  get name () {
    return this.$store.getters.getName
  }
}
