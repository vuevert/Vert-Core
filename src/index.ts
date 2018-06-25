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

export { AppComponent } from './app-component/app-component'
export { Component, Prop, VueInject, VueProvide, Watch } from './app-component/component-decorator'
export { App } from './core'
export { Data } from './data'
export { Injectable } from './injection/injectable'
export { Injector } from './injection/injector'
export { State, Getter, Action, Mutation, namespace } from 'vuex-class'
