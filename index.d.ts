/* tslint:disable */

import { Prop as _Prop, Inject as _Inject, Provide, Watch as _Watch } from 'vue-property-decorator'

import Vue, { ComponentOptions } from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

declare namespace Vert {
  type VueClass<T> = { new (...args: any[]): T & Vue }

  // Component Decorator.
  // ==============================

  /**
   * Decorate a class into the component.
   */
  export function Component<V extends Vue> (options: ComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC
  export function Component<VC extends VueClass<Vue>> (targetClass: VC): VC

  export const Prop: typeof _Prop
  export const VueInject: typeof _Inject
  export const VueProvide: typeof Provide
  export const Watch: typeof _Watch

  // Core.
  // ==============================

  /**
   * App is the basic unit for a project.
   *
   * @class App
   */
  export class App {
    /**
     * Register target as a singleton provider in global.
     *
     * @static
     * @template T
     * @param {TConstructor[]} Providers
     */
    static addSingleton (...Providers: TConstructor[]): typeof App

    /**
     * Register target as a transient provider in global.
     *
     * @static
     * @template T
     * @param {TConstructor[]} Providers
     */
    static addTransient (...Providers: TConstructor[]): typeof App

    /**
     * Name of this app instance.
     *
     * @type {string}
     * @readonly
     * @memberof App
     */
    name: string

    /**
     * Vue store object of this app,
     *
     * @type {*}
     * @readonly
     * @memberof App
     */
    store: any

    /**
     * View model of this app,
     *
     * @type {Vue}
     * @readonly
     * @memberof App
     */
    viewModel: Vue

    /**
     * Root component constructor.
     *
     * @readonly
     * @type {TRootComponent}
     * @memberof App
     */
    RootComponent: TRootComponent

    /**
     * Start up this app.
     *
     * @memberof App
     */
    start (): void

    constructor (option: IAppOption)
  }

  /**
   * Constructor param of AppPage.
   *
   * @interface IAppPage
   */
  export interface IAppOption {
    /**
     * HTML element to mount.
     *
     * @type {(string | HTMLElement)}
     * @memberof IAppOption
     */
    element?: string | HTMLElement

    /**
     * You can specify a name for this app instance.
     *
     * @type {string}
     * @memberof IAppOption
     */
    name?: string

    /**
     * Root component the root vue component.
     *
     * @type {TRootComponent}
     * @memberof IAppOption
     */
    RootComponent: TRootComponent

    /**
     * Vue router instance for this app.
     *
     * @type {*}
     * @memberof IAppOption
     */
    router?: any

    /**
     * Vuex instance for this app.
     *
     * @type {*}
     * @memberof IAppOption
     */
    store?: any

    /**
     * Created hook.
     *
     * @type {THookFunction}
     * @memberof IAppOption
     */
    created?: THookFunction

    /**
     * Mounted hook.
     *
     * @type {THookFunction}
     * @memberof IAppOption
     */
    mounted?: THookFunction

    /**
     * Before destroy hook.
     *
     * @type {THookFunction}
     * @memberof IAppOption
     */
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
   * Standalone injector class.
   */
  export class Injector {
    /**
     * Create a new class injector.
     *
     * @return {Injector}
     */
    static create (): Injector

    /**
     * Register target as a singleton provider.
     * You will get the same instance in every single initialization.
     *
     * @param {TConstructor[]} Providers
     */
    addSingleton (...Providers: TConstructor[]): this

    /**
     * Register target as transient provider.
     * You will get different instances in every single initialization.
     *
     * @param {TConstructor[]} Providers
     */
    addTransient <T> (...Providers: TConstructor[]): this

    /**
     * Get target instance from injector by providing provider.
     *
     * @param {{new(...args): T}} Provider
     * @return {T}
     */
    get <T> (Provider: new (...args: any[]) => T): T

    /**
     * Check whether injector has registered this provider.
     *
     * @param target
     */
    has (target: TConstructor): boolean

    private constructor ()
  }

  /**
   * Make a class injectable.
   */
  export function Injectable (): any

  /**
   * Root component type.
   */
  type TRootComponent<T extends Vue = any, Data = any, Methods = any, Computed = any, Props = any>
    = CombinedVueInstance<T, Data, Methods, Computed, Props>

  /**
   * Hook function type.
   */
  type THookFunction = (viewModel?: Vue) => void

  /**
   * Constructor type.
   */
  type TConstructor = new (...args: any[]) => any

  /**
   * Provider type.
   */
  type TProviders = TConstructor[]
}

export = Vert
