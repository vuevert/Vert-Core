import { Injectable } from '@vert/core/injection'

@Injectable
class LotteryService {
  name: string = 'lottery'
  count: number = 10
}

export {
  LotteryService
}
