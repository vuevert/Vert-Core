import { Factory } from './deco.factory'

describe('Factory testing.', () => {
  test('Factory decorator should work.', () => {
    // Error won't be thrown in production environment.
    expect.assertions(
      process.env.NODE_ENV === 'development' ? 1 : 0
    )

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
