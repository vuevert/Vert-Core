import { Injector } from '../../decorator'
import { Logger, LogLevel } from './srv.logger'

describe('Log Service testing.', () => {
  let logger: Logger
  beforeAll(() => {
    const injector = Injector.create(Logger)
    logger = injector.get(Logger)
  })

  test('Info logger should work.', () => {
    const infoLog = logger.info('Get information:', { name: 'LancerComet' })
    expect(infoLog.level).toEqual(LogLevel.info)
    expect(infoLog.date instanceof Date).toEqual(true)
    expect(Array.isArray(infoLog.content)).toEqual(true)
  })

  test('Warn logger should work.', () => {
    const warnLog = logger.warn(
      'You should provide your username before login.',
      new Error('No username is provided.')
    )
    expect(warnLog.level).toEqual(LogLevel.warn)
    expect(warnLog.date instanceof Date).toEqual(true)
    expect(Array.isArray(warnLog.content)).toEqual(true)
  })

  test('Error logger should work.', () => {
    const errorLog = logger.error(
      'Password is undefined',
      new TypeError('Password is undefined')
    )
    expect(errorLog.level).toEqual(LogLevel.error)
    expect(errorLog.date instanceof Date).toEqual(true)
    expect(Array.isArray(errorLog.content)).toEqual(true)
  })

  test('Logger count should be 3.', () => {
    const logs = logger.getLogs()
    expect(logs.length).toEqual(3)
  })
})
