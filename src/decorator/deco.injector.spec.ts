import { Inject, injectFactory } from './deco.injector'

describe('Injector testing.', () => {
  class Arm {
    count: number = 2
  }

  class Eye {
    count: number = 2
  }

  test('Inject decorator should work for normal class.', () => {
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
      arm: Arm,
      eye: Eye
    })
    const lancerComet = new LancerComet()

    expect(lancerComet.name).toEqual('LancerComet')
    expect(lancerComet.arm.count).toEqual(2)
    expect(lancerComet.eye.count).toEqual(2)
  })

  test('Inject factory should work for normal class.', () => {
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

  test('Inject a class with param should work for normal class.', () => {
    class Man {
      constructor (public name: string) {}
    }

    class Dog {
      constructor (public name: string) {}
    }

    @Inject(
      [Man, ['LancerComet']],
      [Dog, ['Doge']]
    )
    class House {
      constructor (
        public houseKeeper?: Man,
        public dog?: Dog
      ) {}
    }

    const house = new House()
    expect(house.houseKeeper.name).toEqual('LancerComet')
    expect(house.dog.name).toEqual('Doge')
  })

  test('Inject a class with param should work for normal class - use injectFactory.', () => {
    class Man {
      constructor (public name: string) {}
    }

    class Dog {
      constructor (public name: string) {}
    }

    @Inject(Man, Dog)
    class House {
      houseKeeper: Man
      dog: Dog
    }

    const LancerHouse = injectFactory(House, {
      houseKeeper: [Man, ['LancerComet']],
      dog: [Dog, ['Doge']]
    })

    const house = new LancerHouse()
    expect(house.houseKeeper.name).toEqual('LancerComet')
    expect(house.dog.name).toEqual('Doge')
  })
})
