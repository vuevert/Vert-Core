/**
 * Internal service: LocalStorage
 *
 * @description
 * LocalStorage service provides a set of functions to control local storage.
 *
 * @class LocalStorage
 */
class LocalStorage {
  /**
   * Get target item from local storage.
   *
   * @param {string} keyName
   * @return {string}
   */
  getItem (keyName: string): string {
    return window.localStorage.getItem(keyName)
  }

  /**
   * Set an item to local storage.
   *
   * @param {string} keyName
   * @param {string} data
   */
  setItem (keyName: string, data: string) {
    window.localStorage.setItem(keyName, data)
  }
}

export {
  LocalStorage
}
