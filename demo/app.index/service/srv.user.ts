import { Injectable } from '../../../src/decorator'

@Injectable()
class User {
  async getInfoById (userID: number) {
    return {
      id: userID,
      name: 'LancerComet',
      code: 19260817
    }
  }
}

export {
  User
}
