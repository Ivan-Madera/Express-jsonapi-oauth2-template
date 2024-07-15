import { configure, getLogger } from 'log4js'

configure({
  appenders: {
    stdout: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%x{time}] | %m %]',
        tokens: {
          time: () => {
            return new Date().toLocaleString('es-MX', { hour12: false })
          }
        }
      }
    }
  },
  categories: {
    default: {
      appenders: ['stdout'],
      level: 'debug'
    }
  }
})

const logger = getLogger('Logger')

export const LogMessage = (message: string): void => {
  logger.info(message)
}

export const LogInfo = (service: string, version: string): void => {
  logger.info(`[${service}] | [${version}] | Iniciando el servicio`)
}

export const LogWarn = (service: string, version: string, error: any): void => {
  logger.warn(`[${service}] | [${version}] | ${error.message as string}`)
}

export const LogError = (
  service: string,
  version: string,
  error: any
): void => {
  logger.error(`[${service}] | [${version}] | ${error.message as string}`)
}

export const MessageInfo = (
  service: string,
  version: string,
  message: string
): void => {
  logger.info(`[${service}] | [${version}] | ${message}`)
}

export const MessageWarn = (
  service: string,
  version: string,
  message: string
): void => {
  logger.warn(`[${service}] | [${version}] | ${message}`)
}
