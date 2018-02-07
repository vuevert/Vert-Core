import { Injectable } from '../../../src/decorator'

@Injectable
class LotteryService {
  name: string = 'lottery'
  count: number = 10
}

export {
  LotteryService
}
