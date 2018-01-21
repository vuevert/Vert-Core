import { AppComponent } from '../../../src'
import { Component, Inject } from '../../../src/decorator/component'
import { AuthorList } from '../../service/author-list'

@Component
export default class RootComponent extends AppComponent {
  authorListData = []

  @Inject('AuthorList')
  authorList: AuthorList

  mounted () {
    this.authorListData = this.authorList.fetchList()
  }
}
