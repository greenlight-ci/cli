const Docker = require('@greenlight/docker')

const { GREENLIGHT_TEMP } = require('./env')
const logger = require('./logger')

module.exports = function (name, settings, source) {
  return new Promise(async (resolve, reject) => {
    const docker = new Docker(name, settings)
    const issues = []
    let fail = false
    let info = {}

    logger.start(name, 'starting')

    // docker.on('error:schema', error => )
    docker.on('error:stderr', error => {
      logger.fail(name, error)
      return resolve({ plugin: name, run: false, info, issues: [] })
    })

    docker.on('data', issue => {
      issues.push(issue)

      if (issue.severity !== 'info') fail = true

      logger[fail ? 'fail' : 'info'](name, `found ${issues.length} issues`)
    })

    docker.on('end', code => {
      if (code !== 0) return

      if (issues.length === 0) logger.success(name, `found ${issues.length} issues`)

      resolve({ plugin: name, run: true, info, issues })
    })

    try {
      const status = await docker.check()

      if (!status) {
        logger.update(name, 'pulling from registry')

        const result = await docker.pull()

        logger.update(name, result)
      }

      info = await docker.info()

      logger.update(name, 'running')

      docker.run(source, GREENLIGHT_TEMP)
    } catch (error) {
      logger.warn(name, error.message, error)
      resolve({ plugin: name, run: false, info, issues: [] })
    }
  })
}
