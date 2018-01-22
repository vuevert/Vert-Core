import Vue, { ComponentOptions } from 'vue'
import { Store } from 'vuex'

import { THookFunction, TRootComponent, TService } from '../../types'
import { isDefined, isFunction } from '../../utils/util.type-detect'

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
  boot () {
    this._viewModel.$mount(this._element)
  }

  constructor (option: IAppOption) {
    option.services = option.services || []

    this._element = option.element
    this._name = option.name
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
