import { Injectable } from '../../../../src/decorator'

@Injectable
class Lottery {
  name: string = 'lottery'
  count: number = 10
}

export {
  Lottery
}
