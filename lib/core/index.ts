import Vue, { ComponentOptions } from 'vue'

import { GlobalInjector } from '../internal-injectors/global'
import { TConstructor, THookFunction, TRootComponent } from '../types'
import { TypeUtils } from '../utils/type-utils'

let appId = 1

/**
 * App is the basic unit for a project.
 *
 * @description
 * Page is the root member for an app. Create an instance to initialize your app.
 *
 * @class App
 */
export class App {
  /**
   * Register instance as a singleton provider in global.
   *
   * @static
   * @template T
   * @param {TConstructor<T>} type - The type to register
   * @param {T} instance - The instance to register for the type
   */
  static addSingletonInstance<T>(type: TConstructor<T>, instance: T): typeof App {
    GlobalInjector.addSingletonInstance(type, instance);
    return App;
  }

  /**
   * Register target as a singleton provider in global.
   *
   * @static
   * @template T
   * @param {TConstructor[]} Providers
   */
  static addSingleton <T> (...Providers: TConstructor[]): typeof App {
    GlobalInjector.addSingleton(...Providers)
    return App
  }

  /**
   * Register target as a transient provider in global.
   *
   * @static
   * @template T
   * @param {TConstructor[]} Providers
   */
  static addTransient (...Providers: TConstructor[]): typeof App {
    GlobalInjector.addTransient(...Providers)
    return App
  }

  private _element?: string | HTMLElement
  private _name: string
  private _store?: any
  private _router?: any
  private _viewModel: Vue
  private _rootComponent: TRootComponent

  get name (): string { return this._name }
  get store () { return this._store }
  get viewModel (): Vue { return this._viewModel }
  get RootComponent (): TRootComponent { return this._rootComponent }

  private initViewModel (
    RootComponent: TRootComponent,
    created?: THookFunction,
    mounted?: THookFunction,
    beforeDestroy?: THookFunction
  ) {
    const option: ComponentOptions<Vue> = {
      name: this.name,
      render: h => h(RootComponent),
      created () {
        TypeUtils.isFunction(created) && created(this as Vue)
      },
      mounted () {
        TypeUtils.isFunction(mounted) && mounted(this as Vue)
      },
      beforeDestroy () {
        TypeUtils.isFunction(beforeDestroy) && beforeDestroy(this as Vue)
      }
    }

    if (TypeUtils.isDefined(this._router)) {
      Object.assign(option, { router: this._router })
    }

    if (TypeUtils.isDefined(this._store)) {
      Object.assign(option, { store: this._store })
    }

    this._viewModel = new Vue(option)
  }

  /**
   * Start up this app.
   *
   * @memberof App
   */
  start () {
    if (this._element) {
      this._viewModel.$mount(this._element)
    }
  }

  /**
   * Destroy app.
   *
   * @memberof App
   */
  destroy () {
    this._viewModel.$destroy()
  }

  constructor (option: IAppOption) {
    this._element = option.element
    this._name = option.name || 'DefaultApp-' + appId++
    this._router = option.router
    this._store = option.store
    this._rootComponent = option.RootComponent

    this.initViewModel(
      option.RootComponent,
      option.created,
      option.mounted,
      option.beforeDestroy
    )
  }
}

/**
 * Constructor param of AppPage.
 *
 * @interface IAppPage
 */
export interface IAppOption {
  element?: string | HTMLElement
  name?: string
  RootComponent: TRootComponent
  router?: any
  store?: any

  created?: THookFunction
  mounted?: THookFunction
  beforeDestroy?: THookFunction
}
