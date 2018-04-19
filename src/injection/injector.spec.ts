import { Injectable } from './injectable'
import { Injector } from './injector'

describe('Injector test.', () => {
  it('Injector should work.', () => {
    @Injectable
    class A {
      a = 'a'
    }

    @Injectable
    class B {
      b = 'b'
    }

    const injector = Injector.create(A, B)
    const a = injector.get(A)
    const b = injector.get(B)

    expect(a.a).toEqual('a')
    expect(b.b).toEqual('b')

    const a1 = injector.get(A)
    const b1 = injector.get(B)

    expect(a === a1).toEqual(true)
    expect(b === b1).toEqual(true)
  })
})
