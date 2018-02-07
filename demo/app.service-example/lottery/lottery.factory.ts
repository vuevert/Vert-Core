import { Factory } from '../../../src/decorator'

@Factory
abstract class LotteryFactory {
  static createLottery () {
    return {
      name: 'lottery',
      count: 10
    }
  }
}

export {
  LotteryFactory
}
