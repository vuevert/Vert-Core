import { UnInjectable } from './deco.uninjectable'

describe('UnInjectable testing.', () => {
  test('UnInjectable decorator should work.', () => {
    expect.assertions(1)

    @UnInjectable
    abstract class App {
      static version: number = 10
    }

    try {
      @UnInjectable
      class App2 {
        version: number = 10
        getVersion () {
          return this.version
        }
      }
    } catch (error) {
      expect(App['$$isInjectable']).toEqual(false)
    }
  })
})
