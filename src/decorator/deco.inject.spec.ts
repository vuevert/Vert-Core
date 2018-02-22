import { Inject, injectFactory } from './deco.inject'
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
    // The class that has constructing arguments must be tagged with "noCache".
    @Injectable({ noCache: true })
    class Man {
      constructor (public name: string) {}
    }

    @Injectable({ noCache: true })
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

  test('Inject a class to different containers and share its state.', () => {
    @Injectable
    class Student {
      name: string = 'John Smith'
      setName (name: string) {
        this.name = name
      }
    }

    @Inject(Student)
    class ClassRoom01 {
      constructor (public student?: Student) {}
    }

    @Inject(Student)
    class ClassRoom02 {
      constructor (public student?: Student) {}
    }

    const class01 = new ClassRoom01()
    const class02 = new ClassRoom02()

    expect(class01.student.name).toEqual('John Smith')
    expect(class02.student.name).toEqual('John Smith')

    class01.student.setName('Eric Cartman')
    expect(class01.student.name).toEqual('Eric Cartman')
    expect(class02.student.name).toEqual('Eric Cartman')
  })
})
