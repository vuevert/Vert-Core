import { AppComponent } from '../../../src'
import { Component, Inject } from '../../../src/decorator/component'
import { AuthorList } from '../service/author-list'

@Component
export default class RootComponent extends AppComponent {
  @Inject('AuthorList')
  authorList: AuthorList

  mounted () {
    console.log(this.authorList)
  }
}
