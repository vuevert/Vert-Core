import 'reflect-metadata'
import { Data, Injectable, Injector } from '../dist'

describe('Data testing.', () => {
  it('Type-Secured data should work.', () => {
    const lancerComet = Student.create({
      name: 'LancerComet', age: 27
    })

    expect(lancerComet.name).toEqual('LancerComet')
    expect(lancerComet.age).toEqual(27)

    lancerComet.name = 'Wch'
    expect(lancerComet.name).toEqual('Wch')

    lancerComet.age = 'Wrong type' as any
    expect(lancerComet.age).toEqual(27)
  })

  class Student {
    static create (param?: IStudent): Student {
      return Data.createTypeSafetyInstance(Student, param)
    }

    name: string = ''
    age: number = 0

    constructor (param?: IStudent) {
      if (param) {
        this.name = param.name
        this.age = param.age
      }
    }
  }
})

interface IStudent {
  name: string
  age: any
}

// function Type (target: any, key: string) {
//   const typeMeta = Reflect.getMetadata('design:type', target, key)
//   const targetType = typeMeta.name
//   console.log(key, 'should be a', targetType)
// }
