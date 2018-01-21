import Vue, { ComponentOptions } from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'
import { Store } from 'vuex'

import { AppService } from '../../decorator/service'
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
  private _store: Store<any>
  private _viewModel: Vue

  private _serviceInstances: {[srvName: string]: AppService} = {}

  get name (): string { return this._name }
  get store (): Store<any> { return this._store }
  get viewModel (): Vue { return this._viewModel }

  private createSrvInstance (services: Array<typeof AppService>) {
    for (const Srv of services) {
      const isSrv = Srv.prototype.$isService
      const srvName = Srv.prototype.$serviceName
      if (!srvName || !isSrv) {
        console.error('[Error] This is not a service constructor but is given for creating service:', Srv)
        continue
      }
      const srv = new Srv()
      this._serviceInstances[srvName] = srv
    }
  }

  private initViewModel (RootComponent: TRootComponent) {
    const option: ComponentOptions<Vue> = {
      name: this.name,
      template: createViewModelTemplate(`v-${this.name}`),
      components: {
        'root-component': RootComponent
      },
      provide: this._serviceInstances
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
    this._store = option.store

    this.createSrvInstance(option.services || [])
    this.initViewModel(option.rootComponent)
  }
}

/**
 * Root component type.
 */
type TRootComponent = CombinedVueInstance<any, any, any, any, any>

/**
 * Constructor param of AppPage.
 *
 * @interface IAppPage
 */
export interface IAppPageOption {
  element: string | HTMLElement
  name: string
  rootComponent: TRootComponent
  services?: Array<typeof AppService>
  store?: Store<any>
}

function createViewModelTemplate (id: string): string {
  return `
  <div id="${id}">
    <root-component></root-component>
  </div>
  `
}
