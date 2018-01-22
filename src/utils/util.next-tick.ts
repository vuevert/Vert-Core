import Vue from 'vue'

/**
 * Run a function in next tick.
 */
function nextTick (): Promise<void>
function nextTick (callback: () => void, context?: any[]): void
function nextTick (callback?, context?) {
  if (typeof callback === 'function') {
    Vue.nextTick(callback, context)
  } else {
    return Vue.nextTick()
  }
}

export {
  nextTick
}
