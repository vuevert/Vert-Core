import { Inject } from './inject'
import { Injectable } from './injectable'

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
      constructor (public arm?: Arm, public eye?: Eye) {
      }
    }

    const human = new Human()
    expect(human.arm.count).toEqual(2)
    expect(human.eye.count).toEqual(2)
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
