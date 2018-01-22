import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from '../decorator/deco.injection'

const DEFAULT_TIMEOUT = 5000

/**
 * Http Service.
 *
 * @class Http
 */
@Injectable()
class Http {
  private _$http: AxiosInstance
  private get $http (): AxiosInstance {
    if (!this._$http) {
      this._$http = axios.create({
        timeout: DEFAULT_TIMEOUT
      })
    }

    return this._$http
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
