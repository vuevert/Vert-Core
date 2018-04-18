abstract class ReflectionUtils {
  static getProvidersFromParams (target: any) {
    return (
      Reflect.getMetadata('design:paramtypes', target) || []
    ).filter(item => {
      return typeof item === 'function' &&
        item !== Object &&
        item !== Function
    })
  }
}

export {
  ReflectionUtils
}
