import { AppComponent, Component } from '../../src/app-component'

import { LotteryService } from './lottery/lottery.service'

@Component({
  providers: [LotteryService]
})
export class RootComponent extends AppComponent {
  get lotteryName () {
    return this.lotteryService.name
  }

  get lotteryCount () {
    return this.lotteryService.count
  }

  constructor (public lotteryService: LotteryService) {
    super()
  }
}
