import { Injector } from '../../decorator'
import { Qs } from './srv.qs'

describe('QS Service testing.', () => {
  let qs: Qs
  beforeAll(() => {
    const injector = Injector.create(Qs)
    qs = injector.get(Qs)
  })

  test('parse should work.', () => {
    expect(qs.parse('a=a&b=b')).toMatchObject({ a: 'a', b: 'b' })
    expect(qs.parse('foo[bar]=baz')).toMatchObject({ foo: { bar: 'baz' } })
  })

  test('Stringify should work.', () => {
    expect(qs.stringify({ a: 'a', b: 'b', c: 'c' })).toEqual('a=a&b=b&c=c')
    expect(qs.stringify({ foo: { bar: 'baz' } })).toEqual('foo%5Bbar%5D=baz')
  })
})
