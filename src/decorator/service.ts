/**
 * Decorate a class into a service.
 *
 * @param {string} serviceName Service name.
 * @returns
 */
function Service (serviceName: string) {
  return function (target: typeof AppService) {
    target.prototype.$serviceName = serviceName
    target.prototype.$isService = true
  }
}

/**
 * App Service class.
 *
 * @description
 * Service is a type of class that provides a mount of functions.
 * Please create a service by extending this class.
 *
 * @class AppService
 */
class AppService {
  $serviceName: string
  $isService: boolean
}

export {
  AppService,
  Service
}
