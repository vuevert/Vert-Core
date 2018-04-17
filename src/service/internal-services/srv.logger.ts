import { Inject, Injectable } from '../../injection/index'
import { LocalStorage } from './srv.local-storage'

@Injectable
@Inject(LocalStorage)
class Logger {
  private logPool: ILog[] = []

  private addLog (log: ILog) {
    this.logPool.push(log)
  }

  debug (...content) {
    if (process.env.NODE_ENV === 'development') {
      const log = createLog(LogLevel.debug, ...content)
      console.debug(`[${LogLevel.debug}]`, ...content)
      this.addLog(log)
      return log
    }
  }

  log (...content) {
    const log = createLog(LogLevel.info, ...content)
    console.log(`[${LogLevel.info}]`, ...content)
    this.addLog(log)
    return log
  }

  info (...content) {
    return this.log(...content)
  }

  warn (...content) {
    const log = createLog(LogLevel.warn, ...content)
    console.warn(`[${LogLevel.warn}]`, ...content)
    this.addLog(log)
    return log
  }

  error (...content) {
    const log = createLog(LogLevel.error, ...content)
    console.error(`[${LogLevel.error}]`, ...content)
    this.addLog(log)
    return log
  }

  getLogs () {
    return this.logPool
  }

  constructor (public localStorage: LocalStorage) {}
}

enum LogLevel {
  debug = 'Debug',
  info = 'Info',
  warn = 'Warn',
  error = 'Error'
}

export {
  Logger,
  LogLevel
}

interface ILog {
  date: Date
  level: LogLevel
  content: any
}

function createLog (level: LogLevel, ...content): ILog {
  return {
    date: new Date(),
    level,
    content
  }
}
