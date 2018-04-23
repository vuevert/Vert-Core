import { App } from './'

describe('Core Nodule test.', () => {
  it('Should create an app without error.', () => {
    const app = new App({
      RootComponent: {
        data () {
          return {
            name: 'vert'
          }
        }
      }
    })

    expect(app.viewModel['name']).toEqual('vert')
  })
})
