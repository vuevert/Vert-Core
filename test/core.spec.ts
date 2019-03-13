import 'reflect-metadata'
import { App } from '../dist'

describe('Core Nodule test.', () => {
  it('Should create an app without error.', () => {
    const app = new App({
      name: 'demo-app',
      RootComponent: {
        data () {
          return {
            name: 'vert'
          }
        }
      }
    })

    expect(app.name).toEqual('demo-app')
    expect(app.viewModel).toBeDefined()
    expect(app.start).toBeDefined()

    try {
      app.start()
    } catch (e) {
      expect(false).toEqual(true)
    }
  })
})
