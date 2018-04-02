const { Promise } = require('smart-promise')
const chalk = require('chalk')
const Plugin = require('@greenlight/plugin')

const logger = require('./logger')
const { GREENLIGHT_TEMP } = require('./env')

module.exports = function (name, settings, source) {
  return new Promise((resolve, reject) => {
    const plugin = new Plugin(name, settings)

    plugin.on('start', () => logger.start(name, 'starting'))
    plugin.on('info', info => logger.info(name, info.version || 'loaded'))
    plugin.on('driver:fail', () => logger.warn(name, 'driver mismatch, skipping'))
    plugin.on('driver:success', driver => logger.info(name, 'found matching driver'))
    plugin.on('running', () => logger.info(name, 'running'))
    plugin.on('end', result => {
      if (!result) return resolve({ name, run: false, issues: [] })

      if (result.issues.length === 0) {
        logger.success(name, 'completed successfully')
      } else {
        logger.fail(name, `found ${result.issues.length} issues`)
      }

      resolve({ name, run: true, issues: result.issues })
    })

    // execute
    return Promise
      .resolve(plugin.run('filesystem', source, GREENLIGHT_TEMP))
      .catch('SpawnError', error => logger.fail(name, chalk`${error.message} {gray (docker error)}`))
      .catch('InfoError', error => logger.fail(name, chalk`invalid plugin info {gray.dim (${error.message})}`))
      .catch('ReportError', error => logger.fail(name, chalk`invalid plugin report {gray.dim (${error.message})}`))
      .catch('SyntaxError', error => logger.fail(name, chalk`${error.message} {gray (json parse error)}`))
      .catch(error => logger.fail(name, chalk`${error.message} {gray (unknown error)}`))
  })
}
