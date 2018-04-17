import { Injectable } from '../../../src/injection/index'

@Injectable
class LotteryService {
  name: string = 'lottery'
  count: number = 10
}

export {
  LotteryService
}
