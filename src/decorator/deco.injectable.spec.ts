import { Injectable } from './deco.injectable'

describe('Injectable testing.', () => {
  test('Injectable decorator should work.', () => {
    @Injectable
    class App {
      version: number = 10
    }

    const app = new App()
    expect(app.version).toEqual(10)
    expect(App['$$isInjectable']).toEqual(true)
    expect(App['$$noCache']).toEqual(false)
  })
})
