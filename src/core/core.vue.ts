/* tslint:disable */
import Vue, { Component, ComponentOptions, VueConstructor } from 'vue'

type PluginFunction <T> = (Vue: VueConstructor, options?: T) => void

interface PluginObject <T> {
  install: PluginFunction<T>
  [key: string]: any
}

export {
  Component,
  ComponentOptions,
  PluginFunction,
  PluginObject,
  Vue
}
