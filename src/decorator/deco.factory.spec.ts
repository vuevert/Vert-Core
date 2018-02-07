import { Factory } from './deco.factory'

describe('Factory testing.', () => {
  test('Factory decorator should work.', () => {
    expect.assertions(1)

    @Factory
    abstract class App {
      static version: number = 10
    }

    try {
      @Factory
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
