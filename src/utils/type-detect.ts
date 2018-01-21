function isUndefined (target: any): boolean {
  return typeof target === 'undefined'
}

function isDefined (target: any): boolean {
  return !isUndefined(target)
}

export {
  isDefined,
  isUndefined
}
