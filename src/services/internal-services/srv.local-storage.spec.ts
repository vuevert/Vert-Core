import { LocalStorage } from './srv.local-storage'

beforeAll(() => {
  global['localStorage'] = {
    storage: {
      hime_storage_MOCKING_DATA: 'WOW'
    },

    getItem (keyName: string) {
      return this.storage[keyName]
    },

    setItem (keyName: string, value: string) {
      this.storage[keyName] = value
    }
  }
})

test('LocalStorage service should work.', () => {
  const localStorage = new LocalStorage()
  expect(localStorage.getItem('MOCKING_DATA')).toEqual('WOW')

  localStorage.setItem('NEW_DATA', 'NEW_DATA')
  expect(localStorage.getItem('NEW_DATA')).toEqual('NEW_DATA')
})
