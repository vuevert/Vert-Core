import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const DEFAULT_TIMEOUT = 5000

const GLOBAL_REQUEST_INTERCEPTORS: IGlobalInterceptor[] = []
const GLOBAL_RESPONSE_INTERCEPTORS: IGlobalInterceptor[] = []

/**
 * Http Service.
 *
 * @class Http
 */
class Http {
  private _$http: AxiosInstance
  private get $http (): AxiosInstance {
    !this._$http && this.init()
    return this._$http
  }

  private init () {
    const $http = axios.create({
      timeout: DEFAULT_TIMEOUT
    })

    GLOBAL_REQUEST_INTERCEPTORS.forEach(item => {
      $http.interceptors.request.use(item.onFulfilled, item.onRejected)
    })

    GLOBAL_RESPONSE_INTERCEPTORS.forEach(item => {
      $http.interceptors.response.use(item.onFulfilled, item.onRejected)
    })

    this._$http = $http
  }

  /**
   * Add an interceptor for all requests.
   *
   * @static
   * @param {IGlobalInterceptor} interceptor
   */
  static addGlobalRequestInterceptor (interceptor: IGlobalInterceptor) {
    !GLOBAL_REQUEST_INTERCEPTORS.includes(interceptor) && GLOBAL_REQUEST_INTERCEPTORS.push(interceptor)
  }

  /**
   * Add an interceptor for all responses.
   *
   * @static
   * @param {IGlobalInterceptor} inteceptor
   */
  static addGlobalResponseInterceptor (inteceptor: IGlobalInterceptor) {
    !GLOBAL_RESPONSE_INTERCEPTORS.includes(inteceptor) && GLOBAL_RESPONSE_INTERCEPTORS.push(inteceptor)
  }

  /**
   * Make a get request.
   *
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @returns
   * @memberof Http
   */
  get (url: string, config?: AxiosRequestConfig) {
    return this.$http.get(url, config)
  }

  /**
   * Make a post request.
   *
   * @param {string} url
   * @param {*} [data]
   * @param {AxiosRequestConfig} [config]
   * @returns
   * @memberof Http
   */
  post (url: string, data?: any, config?: AxiosRequestConfig) {
    return this.$http.post(url, data, config)
  }

  /**
   * Make a request by using config.
   *
   * @param {AxiosRequestConfig} config
   * @return {AxiosPromise<any>}
   */
  request (config: AxiosRequestConfig) {
    return this.$http.request(config)
  }

  /**
   * Add an interceptor for requests.
   *
   * @param {((value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>)} [onFulfilled]
   * @param {(error: any) => any} [onRejected]
   * @returns {number}
   * @memberof Http
   */
  addRequestInterceptor (
    onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any
  ): number {
    return this.$http.interceptors.request.use(onFulfilled, onRejected)
  }

  /**
   * Add an interceptor for responses.
   *
   * @param {((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)} [onFulfilled]
   * @param {(error: any) => any} [onRejected]
   * @returns {number}
   * @memberof Http
   */
  addResponseInterceptor (
    onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any
  ): number {
    return this.$http.interceptors.response.use(onFulfilled, onRejected)
  }
}

export {
  Http
}

interface IGlobalInterceptor {
  onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  onRejected?: (error: any) => any
}
