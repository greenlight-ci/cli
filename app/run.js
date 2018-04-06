const { Promise } = require('smart-promise')
const chalk = require('chalk')
const Plugin = require('@greenlight/plugin')

const { GREENLIGHT_TEMP } = require('./env')
const logger = require('./logger')

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
      .catch('SpawnError', error => logger.fail(name, chalk`{gray.dim ${error.stderr.trim()}}`, error))
      .catch('InfoError', error => logger.fail(name, chalk`{gray invalid plugin info:} {gray.dim ${error.message}}`, error))
      .catch('ReportError', error => logger.fail(name, chalk`{gray invalid plugin report:} {gray.dim ${error.message}}`, error))
      .catch('SyntaxError', error => logger.fail(name, chalk`{gray json parse error:} {gray.dim ${error.message}}`, error))
      .catch(error => logger.fail(name, chalk`{gray unknown error:} {gray.dim ${error.message}}`, error))
      // send an empty response
      .then(() => resolve({
        name,
        run: false,
        issues: []
      }))
  })
}
