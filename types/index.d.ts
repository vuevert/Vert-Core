/* tslint:disable */

import { Prop as _Prop, Inject as _Inject, Provide, Watch as _Watch } from 'vue-property-decorator'

import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

declare namespace Vert {
  // App-Component.
  // ==============================

  /**
   * Basically AppComponent is doing nothing, it is just a game ruler.
   * This class will make all of your cooperator to extend same component constructor
   * and there will not be any problem that is caused by npm-package-version-problem.
   */
  export class AppComponent extends Vue {
  }

  // Component Decorator.
  // ==============================

  /**
   * Decorate a class into the component.
   */
  export function Component (options?: IComponentOption): any

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
  export class App {
    /**
     * Add a singleton to app.
     *
     * @static
     * @template T
     * @param {new (...args: any[]) => T} Provider
     * @param {T} instance
     * @memberof App
     */
    static addSingleton<T>(Provider: new (...args: any[]) => T, instance: T): void

    private _element: string | HTMLElement
    private _name: string
    private _store: any
    private _router: any
    private _viewModel: Vue

    private _serviceInstances: { [srvName: string]: TService }

    name: string
    store: any
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
    start(): void

    constructor(option: IAppOption)
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
    router?: any
    services?: TService[]
    store?: any

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
    static createTypeSafetyInstance <T> (Constructor: TConstructor, ...args: any[]): T
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
  export function Inject (...Providers: TProviders): any

  /**
   * Injectable decorator.
   *
   * @param targetClass
   * @return {any}
   * @constructor
   */
  export function Injectable (targetClass: TConstructor): any

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
    get <T> (Provider: new (...args: any[]) => T): T

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
    set <T> (Provider: new (...args: any[]) => T, instance: T): void

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
   * Constructor type.
   */
  type TConstructor = new (...args: any[]) => any

    /**
   * Service type.
   */
  type TService = TConstructor

  /**
   * Provider type.
   */
  type TProvider = TConstructor
  type TProviders = TProvider[]
}

export = Vert
