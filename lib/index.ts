/**
 * @vert/core
 *
 * @description
 * Vert is designed to build an OOP application which is based on Vue.
 *
 * @author LancerComet
 * @copyright LancerComet
 * @licence MIT
 */

export { Component, Prop, VueInject, VueProvide, Watch } from './app-component/component-decorator'
export { App } from './core'
export { Data } from './data'
export { Injector } from './injection/injector'
export { Injectable } from './injection/injectable'
export { State, Getter, Action, Mutation, namespace } from './libs/vuex-class'
