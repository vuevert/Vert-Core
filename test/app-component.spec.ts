/* tslint:disable */

import { AppComponent, Component } from '../lib'

describe('App Component test.', () => {
  @Component({
    name: 'some-component',
    template: '<div>{{greeting}}</div>'
  })
  class SomeComponent extends AppComponent {
    name: string = 'LancerComet'
    age: number = 99

    get greeting (): string {
      return `Hello! My name is ${this.name} and I'm ${this.age} now.`
    }
  }

  let someComponent: SomeComponent = null
  beforeAll(() => {
    someComponent = new SomeComponent()
  })

  it('Should convert class SomeComponent into a vue component.', () => {
    expect(someComponent['_isVue']).toEqual(true)
    expect(someComponent['$options'].template).toEqual('<div>{{greeting}}</div>')
    expect(someComponent['$options'].computed.greeting).toBeDefined()
    expect(someComponent.name).toEqual('LancerComet')
    expect(someComponent.age).toEqual(99)
    expect(someComponent.greeting).toEqual(`Hello! My name is LancerComet and I'm 99 now.`)
    expect(Object.prototype.toString.call(someComponent.$mount)).toEqual('[object Function]')
  })
})
