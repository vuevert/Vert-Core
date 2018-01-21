import Vue from 'vue/dist/vue'
import { AppPage, IAppPageOption } from './page'

abstract class VueEnterprise {
  static readonly VERSION = '1.0.0'

  static createAppPage (option: IAppPageOption) {
    return new AppPage(option)
  }

  static nextTick (): Promise<void>
  static nextTick (callback: () => void, context?: any[]): void
  static nextTick (callback?, context?) {
    if (typeof callback === 'function') {
      Vue.nextTick(callback, context)
    } else {
      return Vue.nextTick()
    }
  }
}

export {
  VueEnterprise
}
