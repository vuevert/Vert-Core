/* tslint:disable */

import { Prop as _Prop, Inject as _Inject, Provide, Watch as _Watch } from 'vue-property-decorator'
import { State as _State, Getter as _Getter, Action as _Action, Mutation as _Mutation, namespace as _namespace } from 'vuex-class'

import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

declare namespace Vert {
  // Vuex-class decorators.
  export const State: typeof _State
  export const Getter: typeof _Getter
  export const Action: typeof _Action
  export const Mutation: typeof _Mutation
  export const namespace: typeof _namespace

  // App-Component.
  // ==============================

  /**
   * Basically AppComponent is doing nothing, it is just a game ruler.
   * This class will make all of your cooperator to extend same component constructor
   * and there will not be any problem that is caused by npm-package-version-problem.
   */
  export const AppComponent: typeof Vue

  // Component Decorator.
  // ==============================

  /**
   * Decorate a class into the component.
   */
  export function Component (options: IComponentOption): (targetClass: TConstructor) => any
  export function Component (targetClass: TConstructor): any

  /**
   * Component param interface.
   */
  export interface IComponentOption {
    components?: { [key: string]: any  }
    directives?: { [key: string]: any }
    filters?: { [key: string]: typeof Function }
    template?: string
    name?: string

    beforeRouteEnter?: (to: any, form: any, next: any) => void
    beforeRouteLeave?: (to: any, form: any, next: any) => void
    beforeRouteUpdate?: (to: any, form: any, next: any) => void
  }

  export const Prop: typeof _Prop
  export const VueInject: typeof _Inject
  export const VueProvide: typeof Provide
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
     * Register target as a singleton provider in global.
     *
     * @static
     * @template T
     * @param {TConstructor[]} Providers
     */
    static addSingleton (...Providers: TConstructor[]): typeof App

    /**
     * Register target as a scoped provider in global.
     *
     * @static
     * @template T
     * @param {TConstructor[]} Providers
     */
    static addScoped (...Providers: TConstructor[]): typeof App

    name: string
    store: any
    viewModel: Vue

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
    element?: string | HTMLElement
    name?: string
    RootComponent: TRootComponent
    router?: any
    services?: TConstructor[]
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
     * Register target as singleton provider.
     *
     * @param {TConstructor} Provider
     */
    addSingleton (Provider: TConstructor): this

    /**
     * Register target as scoped provider.
     *
     * @param {TConstructor} Provider
     */
    addScoped <T> (Provider: TConstructor): this

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
