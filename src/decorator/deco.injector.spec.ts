import { Inject, injectFactory } from './deco.injector'
import { Injectable } from './deco.injectable'

describe('Injector testing.', () => {
  @Injectable
  class Arm {
    count: number = 2
  }

  @Injectable
  class Eye {
    count: number = 2
  }

  test('Inject decorator should work for normal class.', () => {
    @Inject(Arm, Eye)
    @Injectable
    class Human {
      constructor (public arm?: Arm, public eye?: Eye,) {
      }
    }

    const human = new Human()
    expect(human.arm.count).toEqual(2)
    expect(human.eye.count).toEqual(2)

    // Using inject factory.
    @Injectable
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
    @Injectable
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
    @Injectable
    class Man {
      constructor (public name: string) {}
    }

    @Injectable
    class Dog {
      constructor (public name: string) {}
    }

    @Inject(
      [Man, ['LancerComet']],
      [Dog, ['Doge']]
    )
    @Injectable
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
    @Injectable
    class Man {
      constructor (public name: string) {}
    }

    @Injectable
    class Dog {
      constructor (public name: string) {}
    }

    @Inject(Man, Dog)
    @Injectable
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
