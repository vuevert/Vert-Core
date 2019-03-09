/* tslint:disable */

import { Injectable, Injector } from '../lib'

describe('Injection test.', () => {
  it('Injector should work.', () => {
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

    const injector = Injector.create(A, B, C)
    const a1 = injector.get(A)
    const b1 = injector.get(B)
    const c1 = injector.get(C)

    expect(a1.name).toEqual('a')
    expect(b1.name).toEqual('b')
    expect(c1.name).toEqual('c')

    expect(c1.a.name).toEqual('a')
    expect(c1.b.name).toEqual('b')

    const a2 = injector.get(A)
    const b2 = injector.get(B)
    const c2 = injector.get(C)

    expect(a1 === a2).toEqual(true)
    expect(b1 === b2).toEqual(true)
    expect(c1 === c2).toEqual(true)
    expect(c1.b === c2.b).toEqual(true)
    expect(c1.a === c2.a).toEqual(true)

    expect(c1.a === a1).toEqual(true)
  })

  // it('Auto injection should work.', () => {
  //   @Injectable()
  //   class A {
  //     name = 'a'
  //   }
  //
  //   @Injectable()
  //   class B {
  //     name = 'b'
  //     constructor (
  //       public a: A
  //     ) {}
  //   }
  //
  //   @Injectable()
  //   class C {
  //     name = 'c'
  //     constructor (
  //       public a?: A,
  //       public b?: B
  //     ) {}
  //   }
  //
  //   const c = new C()
  //   expect(c.a).toBeDefined()
  //   expect(c.b).toBeDefined()
  // })
})
