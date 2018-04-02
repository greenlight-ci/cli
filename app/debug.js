const { appendFile } = require('fs')
const { join } = require('path')
const { promisify } = require('util')

const { GREENLIGHT_DEBUG, GREENLIGHT_TEMP } = require('./env')

const append = promisify(appendFile)

module.exports = async (id, error) => {
  if (!GREENLIGHT_DEBUG) {
    return
  }

  await append(join(GREENLIGHT_TEMP, id, 'error.log'), `${new Date().toLocaleTimeString()} ${JSON.stringify(error)}\n`)
}
