import Vue, { ComponentOptions } from 'vue'

import { GlobalInjector } from '../internal-injectors/global'
import { THookFunction, TRootComponent, TService } from '../types'
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
  static addSingleton <T> (Provider: new (...args: any[]) => T, instance: T) {
    GlobalInjector.saveToInjector(Provider, instance)
  }

  private _element?: string | HTMLElement
  private _name: string
  private _store?: any
  private _router?: any
  private _viewModel: Vue

  private _serviceInstances: {[srvName: string]: TService} = {}

  get name (): string { return this._name }
  get store () { return this._store }
  get viewModel (): Vue { return this._viewModel }

  private initViewModel (
    RootComponent: TRootComponent,
    created?: THookFunction,
    mounted?: THookFunction,
    beforeDestroy?: THookFunction
  ) {
    const option: ComponentOptions<Vue> = {
      name: this.name,
      template: createViewModelTemplate(`${this.name}`),
      components: {
        'root-component': RootComponent
      },
      provide: this._serviceInstances,
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

  constructor (option: IAppOption) {
    option.services = option.services || []

    this._element = option.element
    this._name = option.name || 'DefaultApp' + appId++
    this._router = option.router
    this._store = option.store

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
  services?: TService[]
  store?: any

  created?: THookFunction
  mounted?: THookFunction
  beforeDestroy?: THookFunction
}

function createViewModelTemplate (id: string): string {
  return `<div id="${id}"><root-component></root-component></div>
  `
}
