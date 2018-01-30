import { AppComponent, Component } from '../../../src/app-component'
import { Logger } from '../../../src/services'
import { Author } from '../service'

@Component({
  providers: [Author, Logger]
})
export default class AuthorPanel extends AppComponent {
  authorList: string[] = []

  async fetchAuthorList () {
    const list = await this.authorService.fetchList()
    this.authorList = list
  }

  async created () {
    await this.fetchAuthorList()
  }

  constructor (
    public authorService: Author,
    public logger: Logger
  ) {
    super()
  }
}
