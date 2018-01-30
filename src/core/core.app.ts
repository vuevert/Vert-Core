/**
 * App is the basic unit for a project.
 * An app stands for a single html page.
 */

import { THookFunction, TRootComponent, TService } from '../types'
import { isDefined, isFunction } from '../utils/util.type-detect'
import { Router } from './core.router'
import { Store } from './core.store'
import { ComponentOptions, Vue } from './core.vue'

/**
 * App is the basic unit for a project.
 *
 * @description
 * Page is the root member for an app. Create an instance to initialize your app.
 *
 * @class App
 */
export class App {
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
      template: createViewModelTemplate(`v-${this.name}`),
      components: {
        'root-component': RootComponent
      },
      provide: this._serviceInstances,
      created () {
        isFunction(created) && created(this)
      },
      mounted () {
        isFunction(mounted) && mounted(this)
      },
      beforeDestroy () {
        isFunction(beforeDestroy) && beforeDestroy(this)
      }
    }

    if (isDefined(this._router)) {
      Object.assign(option, { router: this._router })
    }

    if (isDefined(this._store)) {
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
    this._name = option.name
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
  element: string | HTMLElement
  name: string
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
