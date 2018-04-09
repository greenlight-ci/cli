const docker = require('@greenlight/docker')

const { GREENLIGHT_TEMP } = require('./env')
const logger = require('./logger')

module.exports = async function (name, settings, source) {
  logger.start(name, 'starting')

  try {
    const status = await docker.check(name)

    if (status === '') {
      logger.update(name, 'image not found, attempting to pull')

      const result = await docker.pull(name)

      logger.update(name, result)
    }

    const info = await docker.info(name)

    logger.update(name, `found ${info.version || ''}`)

    logger.update(name, 'running')

    const result = await docker.run(name, settings, source, GREENLIGHT_TEMP)

    if (!result) return { plugin: name, run: false, issues: [] }

    if (result.issues.length === 0) {
      logger.success(name, 'issues: 0')
    } else {
      logger.fail(name, `issues: ${result.issues.length}`)
    }

    return { plugin: name, run: true, issues: result.issues }
  } catch (error) {
    logger.fail(name, error.message)
    return { plugin: name, run: false, issues: [] }
  }
}
