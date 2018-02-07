import { AppComponent, Component } from '../../src/app-component'

import { LotteryFactory } from './lottery/lottery.factory'
import { LotteryService } from './lottery/lottery.service'

@Component({
  providers: [LotteryService]
})
export class RootComponent extends AppComponent {
  get lotteryName () {
    return this.lotteryService.name
  }

  get lotteryCount () {
    return LotteryFactory.createLottery().count
  }

  constructor (public lotteryService: LotteryService) {
    super()
  }
}
