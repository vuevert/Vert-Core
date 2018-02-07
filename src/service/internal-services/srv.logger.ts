import { Inject, Injectable } from '../../decorator'
import { LocalStorage } from './srv.local-storage'

const logPool: ILog[] = []

@Injectable
@Inject(LocalStorage)
class Logger {
  debug (...content) {
    if (process.env.NODE_ENV === 'development') {
      const log = createLog(LogLevel.debug, ...content)
      console.debug(`[${LogLevel.debug}]`, ...content)
      addLog(log)
      return log
    }
  }

  log (...content) {
    const log = createLog(LogLevel.info, ...content)
    console.log(`[${LogLevel.info}]`, ...content)
    addLog(log)
    return log
  }

  info (...content) {
    return this.log(...content)
  }

  warn (...content) {
    const log = createLog(LogLevel.warn, ...content)
    console.warn(`[${LogLevel.warn}]`, ...content)
    addLog(log)
    return log
  }

  error (...content) {
    const log = createLog(LogLevel.error, ...content)
    console.error(`[${LogLevel.error}]`, ...content)
    addLog(log)
    return log
  }

  $getLogs () {
    if (process.env.NODE_ENV === 'development') {
      return logPool
    }
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

function addLog (log: ILog) {
  logPool.push(log)
}
