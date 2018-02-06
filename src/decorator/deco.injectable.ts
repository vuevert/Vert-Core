function Injectable (target: any) {
  Object.defineProperty(target, '$$isInjectable', {
    value: true
  })
}

export {
  Injectable
}
