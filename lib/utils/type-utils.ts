class TypeUtils {
  static isUndefined (target: any): boolean {
    return typeof target === 'undefined'
  }

  static isDefined (target: any): boolean {
    return !TypeUtils.isUndefined(target)
  }

  static isFunction (target: any): boolean {
    return typeof target === 'function'
  }
}

export {
  TypeUtils
}
