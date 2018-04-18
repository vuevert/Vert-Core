import { Injectable } from '../../injection/index'

let nextJobs = []
let jobTimer = null

let nextTicks = []
let tickPromise = null

/**
 * Internal Service: Timer.
 *
 * @description
 * Timer provides a set of functions to use timer-related function.
 */
@Injectable
class Timer {
  setTimeout (callback: () => void, timeout: number = 1) {
    return setTimeout(callback, timeout)
  }

  setInterval (callback: () => void, interval: number = 1) {
    return setInterval(callback, interval)
  }

  nextTick (callback: () => void) {
    if (nextTicks.indexOf(callback) < 0) {
      nextTicks.push(callback)
    }
    doNextTick()
  }

  nextJob (callback: () => any) {
    if (nextJobs.indexOf(callback) < 0) {
      nextJobs.push(callback)
    }
    doNextJob()
  }
}

export {
  Timer
}

function doNextTick () {
  if (!tickPromise) {
    tickPromise = new Promise(resolve => resolve()).then(() => {
      nextTicks.forEach(func => {
        typeof func === 'function' && func()
      })
      nextTicks = []
      tickPromise = null
    })
  }
}

function doNextJob () {
  if (!jobTimer) {
    jobTimer = setTimeout(() => {
      nextJobs.forEach(func => {
        typeof func === 'function' && func()
      })
      nextJobs = []
      jobTimer = null
    }, 1)
  }
}
