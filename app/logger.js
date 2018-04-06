const Logress = require('logress')
const chalk = require('chalk')

const { GREENLIGHT_DEBUG } = require('./env')

// initiate logger
const log = new Logress({ spinner: 'dots5' })

function logger (method, name, message, ...args) {
  GREENLIGHT_DEBUG ? console.log(name, message, ...args) : log[method](name, chalk`{gray [${name}]}: ${message}`)
}

module.exports = {
  end: () => !GREENLIGHT_DEBUG || log.end(),
  fail: (name, message, ...args) => logger('fail', name, message, ...args),
  info: (name, message, ...args) => logger('info', name, message, ...args),
  start: (name, message, ...args) => logger('start', name, message, ...args),
  success: (name, message, ...args) => logger('success', name, message, ...args),
  update: (name, message, ...args) => logger('update', name, message, ...args),
  warn: (name, message, ...args) => logger('warn', name, message, ...args)
}
