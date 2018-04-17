const Docker = require('@greenlight/docker')

const { GREENLIGHT_TEMP } = require('./env')
const logger = require('./logger')

module.exports = function (name, tag, settings, source) {
  return new Promise(async (resolve, reject) => {
    const docker = new Docker(name, tag, settings)
    const issues = []
    let info = {}

    logger.start(name, 'starting')

    // docker.on('error:schema', error => )
    // docker.on('error:stderr', error => )

    docker.on('data', issue => {
      issues.push(issue)
      logger.fail(name, `found ${issues.length} issues`)
    })

    docker.on('end', code => {
      if (issues.length === 0) logger.success(name, `found ${issues.length} issues`)

      resolve({ plugin: name, run: true, info, issues })
    })

    try {
      const status = await docker.check()

      if (status === '') {
        logger.update(name, 'image not found, attempting to pull')

        const result = await docker.pull()

        logger.update(name, result)
      }

      info = await docker.info()

      logger.update(name, 'running')

      docker.run(source, GREENLIGHT_TEMP)
    } catch (error) {
      logger.fail(name, error.message, error)
      resolve({ plugin: name, run: false, info, issues: [] })
    }
  })
}
