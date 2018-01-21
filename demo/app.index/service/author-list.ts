import { AppService, Service } from '../../../src/decorator/service'

@Service('AuthorList')
class AuthorList extends AppService {
  fetchList () {
    return [1, 2, 3]
  }
}

export {
  AuthorList
}
