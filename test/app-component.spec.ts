import 'reflect-metadata'

import Vue from 'vue'
import { App, Component, Injectable } from '../dist'

@Injectable()
class HttpService {
  getData <T> (data: T): T {
    return data
  }
}

@Injectable()
class MyService {
  getName () {
    return this.httpSrv.getData('John Smith')
  }

  getAge () {
    return this.httpSrv.getData(100)
  }

  constructor (
    private httpSrv: HttpService
  ) {}
}


@Component({
  name: 'some-component',
  template: '<div>{{greeting}}</div>'
})
class SomeComponent extends Vue {
  name: string = 'LancerComet'
  age: number = 99

  get greeting (): string {
    return `Hello! My name is ${this.name} and I'm ${this.age} now.`
  }

  updateName () {
    this.name = this.mySrv.getName()
  }

  updateAge () {
    this.age = this.mySrv.getAge()
  }

  constructor (
    private mySrv: MyService
  ) {
    super()
  }
}

describe('App Component test.', () => {
  let someComponent: SomeComponent = null

  beforeAll(() => {
    App.addScoped(HttpService, MyService)

    const div = document.createElement('div')
    document.body.appendChild(div)

    const app = new App({
      element: div,
      RootComponent: SomeComponent
    })
    app.start()

    someComponent = app.viewModel.$children[0]
  })

  it('Should convert class SomeComponent into a vue component.', () => {
    expect(someComponent['_isVue']).toEqual(true)
    expect(someComponent['$options'].template).toEqual('<div>{{greeting}}</div>')
    expect(someComponent['$options'].computed.greeting).toBeDefined()
    expect(typeof someComponent['$mount']).toEqual('function')

    expect(someComponent.name).toEqual('LancerComet')
    expect(someComponent.age).toEqual(99)
    expect(someComponent.greeting).toEqual(`Hello! My name is LancerComet and I'm 99 now.`)

    someComponent.updateName()
    someComponent.updateAge()
    expect(someComponent.name).toEqual('John Smith')
    expect(someComponent.age).toEqual(100)
  })
})
