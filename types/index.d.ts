/* tslint:disable */

import {
  Prop as _Prop, Inject as _Inject, Provide, Watch as _Watch
} from 'vue-property-decorator/lib/vue-property-decorator'

import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'
import Router from 'vue-router'
import { Store } from 'vuex'

declare namespace Vert {
  // App-Component.
  // ==============================

  /**
   * Basically AppComponent is doing nothing, it is just a game ruler.
   * This class will make all of your cooperator to extend same component constructor
   * and there will not be any problem that is caused by npm-package-version-problem.
   */
  export class AppComponent<S = Store, R = Router> extends Vue {
    $store: S
    $route: R
  }

  // Component Decorator.
  // ==============================

  /**
   * Decorate a class into the component.
   */
  export function Component (options: IComponentOption): (target: any) => any
  export function Component (targetClass: new (...args) => any)

  /**
   * Component param interface.
   */
  export interface IComponentOption {
    components?: { [key: string]: any  }
    directives?: { [key: string]: any }
    filters?: { [key: string]: typeof Function }
    template?: string
    name?: string
    providers?: TProviders

    beforeRouteEnter?: any
    beforeRouteLeave?: any
    beforeRouteUpdate?: any
  }

  export const Prop: typeof _Prop
  export const VueInject: typeof _Inject
  export const VueProvider: typeof Provide
  export const Watch: typeof _Watch

  // Core.
  // ==============================

  /**
   * App is the basic unit for a project.
   *
   * @description
   * Page is the root member for an app. Create an instance to initialize your app.
   *
   * @class App
   */
  export class App <R = any, S = any> {
    static addSingleton<T>(Provider: new (...args) => T, instance: T)

    private _element: string | HTMLElement
    private _name: string
    private _store: S
    private _router: R
    private _viewModel: Vue

    private _serviceInstances: { [srvName: string]: TService }

    name: string
    store: S
    viewModel: Vue

    private initViewModel(
      RootComponent: TRootComponent,
      created: THookFunction,
      mounted: THookFunction,
      beforeDestroy: THookFunction
    )

    /**
     * Start up this app.
     *
     * @memberof App
     */
    start()

    constructor(option: IAppOption<R, S>)
  }

  /**
   * Constructor param of AppPage.
   *
   * @interface IAppPage
   */
  export interface IAppOption<R = any, S = any> {
    element?: string | HTMLElement
    name?: string
    rootComponent: TRootComponent
    router?: R
    services?: TService[]
    store?: S

    created?: THookFunction
    mounted?: THookFunction
    beforeDestroy?: THookFunction
  }

  // Data.
  // ==============================

  /**
   * Data static class.
   */
  export class Data {
    /**
     * Create type-safety instance of a class.
     *
     * @param {{new(...args): any}} Constructor
     * @param args
     * @return {T}
     */
    static createTypeSafetyInstance <T> (Constructor: new (...args) => any, ...args): T
  }

  // Injection.
  // ==============================
  /**
   * Inject decorator for class.
   *
   * @description
   * Provide ability to use other class in DI-way.
   *
   * @param Providers
   * @return {(target: any) => any}
   * @constructor
   */
  export function Inject (...Providers): any

  /**
   * Injectable decorator.
   *
   * @param targetClass
   * @return {any}
   * @constructor
   */
  export function Injectable (targetClass: any): any

  /**
   * Standalone injector class.
   */
  class Injector {
    /**
     * Create a new class injector.
     *
     * @param {TProviders} Providers
     * @return {Injector}
     */
    static create (...Providers: TProviders): Injector

    /**
     * Provider storage.
     */
    private map: WeakMap<any, any>

    /**
     * Get target instance from injector by providing provider.
     *
     * @param {{new(...args): T}} Provider
     * @return {T}
     */
    get <T> (Provider: new (...args) => T): T

    /**
     * Whether it holds target provider.
     *
     * @param Provider
     * @return {boolean}
     */
    has (Provider: any): boolean

    /**
     * Set a provider instance to cache,
     *
     * @param {{new(...args): T}} Provider
     * @param {T} instance
     */
    set <T> (Provider: new (...args) => T, instance: T)

    constructor (...Providers: TProviders)
  }

  /**
   * Root component type.
   */
  type TRootComponent = CombinedVueInstance<any, any, any, any, any>

  /**
   * Hook function type.
   */
  type THookFunction = (viewModel?: Vue) => void

  /**
   * Service type.
   */
  type TService = new (...args) => any

  /**
   * Constructor type.
   */
  type TConstructor = new (...args) => any

  /**
   * Provider type.
   */
  type TProvider = TConstructor
  type TProviders = TProvider[]
}

export = Vert
