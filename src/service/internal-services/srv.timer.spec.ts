import { Timer } from './srv.timer'

let count = 0
const data = { count: 0 }
Object.defineProperty(data, 'count', {
  get () {
    return ++count
  }
})

describe('Timer Test.', () => {
  test('nextTick.', (done) => {
    const timer = new Timer()

    step1()
    step2()

    expect(count).toEqual(2)

    function step1 () {
      expect(data.count).toEqual(1)
      timer.nextJob(() => {
        expect(data.count).toEqual(5)
      })
      timer.nextTick(() => {
        expect(data.count).toEqual(3)
      })
    }

    function step2 () {
      timer.nextJob(() => {
        expect(data.count).toEqual(6)
        done()
      })
      timer.nextTick(() => {
        expect(data.count).toEqual(4)
      })
      expect(data.count).toEqual(2)
    }
  })
})
