import { AppComponent, Component } from '../../../src/app-component'
import { Author } from '../service'

@Component({
  providers: [Author]
})
export default class RootComponent extends AppComponent {
  authorList: string[] = []

  async fetchAuthorList () {
    const list = await this.authorSrv.fetchList()
    this.authorList = list
  }

  async created () {
    await this.fetchAuthorList()
  }

  constructor (public authorSrv: Author) {
    super()
    console.log(this.authorSrv)
  }
}
