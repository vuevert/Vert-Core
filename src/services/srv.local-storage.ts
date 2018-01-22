import { Injectable } from '../decorator/deco.injection'

@Injectable()
class LocalStorage {
  getItem (keyName: string): string {
    return window.localStorage.getItem(keyName)
  }

  setItem (keyName: string, data: string) {
    window.localStorage.setItem(keyName, data)
  }
}

export {
  LocalStorage
}
