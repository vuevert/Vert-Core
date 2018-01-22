import { AppComponent } from '../../../src/core'
import { Component } from '../../../src/decorator'
import { Author, srvInjector } from '../service'

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
