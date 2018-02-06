import { UnInjectable } from '../../../../src/decorator'

@UnInjectable
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
