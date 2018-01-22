function isUndefined (target: any): boolean {
  return typeof target === 'undefined'
}

function isDefined (target: any): boolean {
  return !isUndefined(target)
}

function isFunction (target: any): boolean {
  return typeof target === 'function'
}

export {
  isDefined,
  isFunction,
  isUndefined
}
