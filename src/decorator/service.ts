function Service <T extends {new(...args: any[]): {}}> (constructor: T) {
  return class extends constructor {
    $isService = true
  }
}

export {
  Service
}
