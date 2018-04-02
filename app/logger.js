const Logress = require('logress')

const { GREENLIGHT_DEBUG } = require('./env')

// initiate logger
const log = new Logress({ spinner: 'dots5' })

function logger (method, name, message, ...args) {
  GREENLIGHT_DEBUG ? console.log(name, message) : log[method](name, `[${name}]: ${message}`, ...args)
}

module.exports = {
  end: () => !GREENLIGHT_DEBUG || log.end(),
  fail: (name, message, ...args) => logger('fail', name, message),
  info: (name, message, ...args) => logger('info', name, message),
  start: (name, message, ...args) => logger('start', name, message),
  success: (name, message, ...args) => logger('success', name, message),
  update: (name, message, ...args) => logger('update', name, message),
  warn: (name, message, ...args) => logger('warn', name, message)
}
