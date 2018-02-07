const injectableIndicator = '$$isInjectable'

function Injectable (target: any) {
  Object.defineProperty(target, injectableIndicator, {
    value: true
  })
}

export {
  injectableIndicator,
  Injectable
}
