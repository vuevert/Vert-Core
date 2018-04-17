import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from '../../injection'

const DEFAULT_TIMEOUT = 5000

const GLOBAL_REQUEST_INTERCEPTORS: IInterceptor[] = []
const GLOBAL_RESPONSE_INTERCEPTORS: IInterceptor[] = []

/**
 * Http Service.
 *
 * @class Http
 */
@Injectable
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
   * @param {IInterceptor} interceptor
   */
  static addGlobalRequestInterceptor (interceptor: IInterceptor) {
    !GLOBAL_REQUEST_INTERCEPTORS.includes(interceptor) && GLOBAL_REQUEST_INTERCEPTORS.push(interceptor)
  }

  /**
   * Add an interceptor for all responses.
   *
   * @static
   * @param {IInterceptor} inteceptor
   */
  static addGlobalResponseInterceptor (inteceptor: IInterceptor) {
    !GLOBAL_RESPONSE_INTERCEPTORS.includes(inteceptor) && GLOBAL_RESPONSE_INTERCEPTORS.push(inteceptor)
  }

  /**
   * Make a get request.
   *
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @template T
   * @returns
   * @memberof Http
   */
  get <T = any> (url: string, config?: AxiosRequestConfig) {
    return this.$http.get<T>(url, config)
  }

  /**
   * Make a post request.
   *
   * @param {string} url
   * @param {*} [data]
   * @param {AxiosRequestConfig} [config]
   * @template T
   * @returns
   * @memberof Http
   */
  post <T = any> (url: string, data?: any, config?: AxiosRequestConfig) {
    return this.$http.post<T>(url, data, config)
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

interface IInterceptor {
  onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  onRejected?: (error: any) => any
}
