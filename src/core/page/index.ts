import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'
import { Store } from 'vuex'

import { isDefined } from '../../utils/type-detect'

/**
 * AppPage class.
 *
 * @description
 * Page is the root member for an app. Create an instance to initialize your app.
 *
 * @class AppPage
 */
export class AppPage {
  private _element: string | HTMLElement
  private _name: string
  private _services: TService[]
  private _store: Store<any>
  private _viewModel: Vue

  get name (): string { return this._name }
  get store (): Store<any> { return this._store }
  get viewModel (): Vue { return this._viewModel }

  private initViewModel (RootComponent: TRootComponent) {
    const option = {
      template: createViewModelTemplate(`v-app-${this.name}`),
      components: {
        RootComponent
      }
    }

    if (isDefined(this._store)) {
      Object.assign(option, { store: this._store })
    }

    this._viewModel = new Vue(option)
  }

  boot () {
    this._viewModel.$mount(this._element)
  }

  constructor (option: IAppPageOption) {
    this._element = option.element
    this._name = option.name
    this._services = option.services || []
    this._store = option.store
    this.initViewModel(option.rootComponent)
  }
}

/**
 * Root component type.
 */
type TRootComponent = CombinedVueInstance<any, any, any, any, any>

/**
 * Service type.
 */
type TService = typeof Function

/**
 * Constructor param of AppPage.
 *
 * @interface IAppPage
 */
export interface IAppPageOption {
  element: string | HTMLElement
  name: string
  rootComponent: TRootComponent
  services?: TService[]
  store?: Store<any>
}

function createViewModelTemplate (id: string): string {
  return `
  <div id="${id}">
    <root-component></root-component>
  </div>
  `
}
