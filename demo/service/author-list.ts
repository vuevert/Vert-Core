import { AppService, Service } from '../../src/decorator/service'

@Service('AuthorList')
class AuthorList extends AppService {
  fetchList () {
    return ['John Smith', 'Jimmy Parker', 'Eric Cartman', 'LancerComet']
  }
}

export {
  AuthorList
}
