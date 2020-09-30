import { App } from '../dist/index.esm.js'

describe('App testing.', () => {
  const RootComponent = {
    data () {
      return {
        name: 'LancerComet'
      }
    }
  }

  it('Should emit created hook.', done => {
    const app = new App({
      RootComponent,
      created () {
        done()
      }
    })

    app.start()
  })

  it('Should emit mounted hook.', done => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const app = new App({
      element: div,
      RootComponent,
      mounted () {
        done()
      }
    })

    app.start()
  })

  it('Should emit beforeDestroy hook.', done => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const app = new App({
      element: div,
      RootComponent,
      beforeDestroy () {
        done()
      }
    })

    app.start()
    app.destroy()
  })
})
