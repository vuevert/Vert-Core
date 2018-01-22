import { AppComponent } from '../../../src/core/index'
import { Component } from '../../../src/decorator/index'
import { Author, srvInjector } from '../service/index'

const authorSrv: Author = srvInjector.get(Author)

@Component
export default class RootComponent extends AppComponent {
  authorList: string[] = []

  async fetchAuthorList () {
    const list = await authorSrv.fetchList()
    this.authorList = list
  }

  async created () {
    await this.fetchAuthorList()
  }

  constructor () {
    super()
  }
}
