class Utils {
  static isUndefined (target: any): boolean {
    return typeof target === 'undefined'
  }

  static isDefined (target: any): boolean {
    return !Utils.isUndefined(target)
  }

  static isFunction (target: any): boolean {
    return typeof target === 'function'
  }
}

export {
  Utils
}
