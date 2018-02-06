import { Injectable } from '../../decorator'

/**
 * Internal service: LocalStorage
 *
 * @description
 * LocalStorage service provides a set of functions to control local storage.
 *
 * @class LocalStorage
 */
@Injectable
class LocalStorage {
  private prefix: string = 'hime_storage_'

  /**
   * Get target item from local storage.
   *
   * @param {string} keyName
   * @return {string}
   */
  getItem (keyName: string): string {
    keyName = this.prefix + keyName
    return localStorage.getItem(keyName)
  }

  /**
   * Set an item to local storage.
   *
   * @param {string} keyName
   * @param {string} data
   */
  setItem (keyName: string, data: string) {
    keyName = this.prefix + keyName
    localStorage.setItem(keyName, data)
  }

  // TODO: Value that will be expired.
}

export {
  LocalStorage
}
