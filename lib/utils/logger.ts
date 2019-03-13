abstract class Logger {
  static warn (...args) {
    console.warn('[@vert/core]', ...args)
  }

  static error (...args) {
    console.error('[@vert/core]', ...args)
  }
}

export {
  Logger
}
