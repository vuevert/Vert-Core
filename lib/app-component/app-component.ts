/*
 * Basically AppComponent is doing nothing, it is just a game ruler.
 * This class will make all of your cooperator to extend same component constructor
 * and there will not be any problem that is caused by npm-package-version-problem.
 */

import Vue from 'vue'

// TODO: Remove app component.
class AppComponent extends Vue {
  $route?: any
  $router?: any
}

export {
  AppComponent
}
