import { Inject, injectFactory } from './deco.injector'

describe('Injector testing.', () => {
  class Arm {
    count: number = 2
  }

  class Eye {
    count: number = 2
  }

  test('Injector decorator should work for normal class.', () => {
    @Inject(Arm, Eye)
    class Human {
      constructor (public arm?: Arm, public eye?: Eye,) {
      }
    }

    const human = new Human()
    expect(human.arm.count).toEqual(2)
    expect(human.eye.count).toEqual(2)

    // Using inject factory.
    class LC {
      arm: Arm
      eye: Eye
      name: string = 'LancerComet'
    }

    const LancerComet = injectFactory(LC, {
      arm: Arm, eye: Eye
    })
    const lancerComet = new LancerComet()

    expect(lancerComet.name).toEqual('LancerComet')
    expect(lancerComet.arm.count).toEqual(2)
    expect(lancerComet.eye.count).toEqual(2)
  })

  test('Injector factory should work for normal class.', () => {
    class LC {
      arm: Arm
      eye: Eye
      name: string = 'LancerComet'
    }

    const LancerComet = injectFactory(LC, {
      arm: Arm, eye: Eye
    })

    const lancerComet = new LancerComet()

    expect(lancerComet.name).toEqual('LancerComet')
    expect(lancerComet.arm.count).toEqual(2)
    expect(lancerComet.eye.count).toEqual(2)
  })
})
