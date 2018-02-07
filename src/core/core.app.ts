/**
 * App is the basic unit for a project.
 * An app stands for a single html page.
 */

import { THookFunction, TRootComponent, TService } from '../types'
import { Utils } from '../utils/'
import { Router } from './core.router'
import { Store } from './core.store'
import { ComponentOptions, PluginFunction, PluginObject, Vue } from './core.vue'

/**
 * App is the basic unit for a project.
 *
 * @description
 * Page is the root member for an app. Create an instance to initialize your app.
 *
 * @class App
 */
export class App {
  static use <T = any> (plugin: PluginObject<T> | PluginFunction<T>, options?: T) {
    Vue.use(plugin, options)
  }

  private _element: string | HTMLElement
  private _name: string
  private _store: Store<any>
  private _router: Router
  private _viewModel: Vue

  private _serviceInstances: {[srvName: string]: TService} = {}

  get name (): string { return this._name }
  get store (): Store<any> { return this._store }
  get viewModel (): Vue { return this._viewModel }

  private initViewModel (
    RootComponent: TRootComponent,
    created: THookFunction,
    mounted: THookFunction,
    beforeDestroy: THookFunction
  ) {
    const option: ComponentOptions<Vue> = {
      name: this.name,
      template: createViewModelTemplate(`${this.name}`),
      components: {
        'root-component': RootComponent
      },
      provide: this._serviceInstances,
      created () {
        Utils.isFunction(created) && created(this)
      },
      mounted () {
        Utils.isFunction(mounted) && mounted(this)
      },
      beforeDestroy () {
        Utils.isFunction(beforeDestroy) && beforeDestroy(this)
      }
    }

    if (Utils.isDefined(this._router)) {
      Object.assign(option, { router: this._router })
    }

    if (Utils.isDefined(this._store)) {
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
    this._viewModel.$mount(this._element)
  }

  constructor (option: IAppOption) {
    option.services = option.services || []

    this._element = option.element
    this._name = option.name || 'default_app'
    this._router = option.router
    this._store = option.store

    this.initViewModel(
      option.rootComponent,
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
  rootComponent: TRootComponent
  router?: Router
  services?: TService[]
  store?: Store<any>

  created?: THookFunction
  mounted?: THookFunction
  beforeDestroy?: THookFunction
}

function createViewModelTemplate (id: string): string {
  return `
  <div id="${id}">
    <root-component></root-component>
  </div>
  `
}
