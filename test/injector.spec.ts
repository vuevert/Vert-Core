/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */

import { Injectable, Injector } from '../lib'

describe('Injector test.', () => {
  @Injectable()
  class A {
    name = 'a'
  }

  @Injectable()
  class B {
    name = 'b'
    constructor (
      public a: A
    ) {}
  }

  @Injectable()
  class C {
    name = 'c'
    constructor (
      public a: A,
      public b: B
    ) {}
  }

  it('Transient injection should work.', () => {
    const injector = Injector.create()
      .addTransient(A, B, C)

    const a1 = injector.get(A)
    const b1 = injector.get(B)
    const c1 = injector.get(C)

    expect(a1.name).toEqual('a')
    expect(b1.name).toEqual('b')
    expect(b1.a.name).toEqual('a')
    expect(c1.name).toEqual('c')
    expect(c1.a.name).toEqual('a')
    expect(c1.b.name).toEqual('b')

    a1.name = 'John Smith'
    expect(b1.a.name).toEqual('a')
    expect(c1.a.name).toEqual('a')

    const a2 = injector.get(A)
    const b2 = injector.get(B)
    const c2 = injector.get(C)

    expect(a1 === a2).toEqual(false)
    expect(b1 === b2).toEqual(false)
    expect(b1.a === b2.a).toEqual(false)
    expect(b1.a === a1).toEqual(false)
    expect(b2.a === a2).toEqual(false)
    expect(c1 === c2).toEqual(false)
    expect(c1.a === c2.a).toEqual(false)
    expect(c1.b === c2.b).toEqual(false)
    expect(c1.a === a1).toEqual(false)
    expect(c1.b === b2).toEqual(false)
    expect(c2.a === a1).toEqual(false)
    expect(c2.b === b2).toEqual(false)
  })

  it('Singleton injection should work.', () => {
    const injector = Injector.create()
      .addSingleton(A, B, C)

    const a1 = injector.get(A)
    const b1 = injector.get(B)
    const c1 = injector.get(C)

    expect(a1.name).toEqual('a')
    expect(b1.name).toEqual('b')
    expect(b1.a.name).toEqual('a')
    expect(c1.name).toEqual('c')
    expect(c1.a.name).toEqual('a')
    expect(c1.b.name).toEqual('b')

    a1.name = 'John Smith'
    expect(b1.a.name).toEqual('John Smith')
    expect(c1.a.name).toEqual('John Smith')

    const a2 = injector.get(A)
    const b2 = injector.get(B)
    const c2 = injector.get(C)

    expect(a1 === a2).toEqual(true)
    expect(b1 === b2).toEqual(true)
    expect(b1.a === b2.a).toEqual(true)
    expect(b1.a === a1).toEqual(true)
    expect(b2.a === a2).toEqual(true)
    expect(c1 === c2).toEqual(true)
    expect(c1.a === c2.a).toEqual(true)
    expect(c1.b === c2.b).toEqual(true)
    expect(c1.a === a1).toEqual(true)
    expect(c1.b === b2).toEqual(true)
    expect(c2.a === a1).toEqual(true)
    expect(c2.b === b2).toEqual(true)
  })

  it('Mixing usage should work.', () => {
    const injector = Injector.create()
      .addSingleton(A)
      .addTransient(B, C)

    const a1 = injector.get(A)
    const b1 = injector.get(B)
    const c1 = injector.get(C)
    const a2 = injector.get(A)
    const b2 = injector.get(B)
    const c2 = injector.get(C)

    expect(a1 === a2).toEqual(true)
    expect(b1 === b2).toEqual(false)
    expect(c1.b === b2).toEqual(false)
    expect(c1 === c2).toEqual(false)
    expect(c2.b === b2).toEqual(false)

    a1.name = 'LancerComet'
    expect(a1.name).toEqual('LancerComet')
    expect(a2.name).toEqual('LancerComet')
    expect(b1.a.name).toEqual('LancerComet')
    expect(b2.a.name).toEqual('LancerComet')
    expect(c1.a.name).toEqual('LancerComet')
    expect(c2.a.name).toEqual('LancerComet')

    b1.name = 'Tom'
    expect(b1.name).toEqual('Tom')
    expect(c1.b.name).toEqual('b')
  })

  it('Singleton instance injection should work.', () => {
    const a = new A()
    a.name = 'foo'

    const injector = Injector.create()
      .addSingletonInstance(A, a)

    injector.addSingleton(B, C)

    const a1 = injector.get(A)
    const b1 = injector.get(B)
    const c1 = injector.get(C)

    expect(a1.name).toEqual('foo')
    expect(b1.name).toEqual('b')
    expect(b1.a.name).toEqual('foo')
    expect(c1.name).toEqual('c')
    expect(c1.a.name).toEqual('foo')
    expect(c1.b.name).toEqual('b')

    a1.name = 'John Smith'
    expect(b1.a.name).toEqual('John Smith')
    expect(c1.a.name).toEqual('John Smith')

    const a2 = injector.get(A)
    const b2 = injector.get(B)
    const c2 = injector.get(C)

    expect(a === a1).toEqual(true)
    expect(a1 === a2).toEqual(true)
    expect(b1 === b2).toEqual(true)
    expect(b1.a === b2.a).toEqual(true)
    expect(b1.a === a1).toEqual(true)
    expect(b2.a === a2).toEqual(true)
    expect(c1 === c2).toEqual(true)
    expect(c1.a === c2.a).toEqual(true)
    expect(c1.b === c2.b).toEqual(true)
    expect(c1.a === a1).toEqual(true)
    expect(c1.b === b2).toEqual(true)
    expect(c2.a === a1).toEqual(true)
    expect(c2.b === b2).toEqual(true)
  })
})
