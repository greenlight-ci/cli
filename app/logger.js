const Logress = require('logress')
const { blue, yellow, green, red, bold, gray } = require('chalk')

const { GREENLIGHT_DEBUG } = require('./env')

// initiate logger
const log = new Logress({ spinner: 'circleHalves' })

const indicators = {
  'blue': blue('⏺'),
  'green': green('⏺'),
  'red': red('⏺'),
  'yellow': yellow('⏺')
}

const format = (name, msg) => {
  return `${bold(name)}: ${gray(msg)}`
}

module.exports = {
  end: () => !GREENLIGHT_DEBUG || log.end(),
  start: (name, msg) => log.start(name, format(name, msg)),
  update: (name, msg) => log.update(name, format(name, msg)),

  fail: (name, msg) => log.prefix(name, indicators.red, format(name, msg)),
  info: (name, msg) => log.prefix(name, indicators.blue, format(name, msg)),
  success: (name, msg) => log.prefix(name, indicators.green, format(name, msg)),
  warn: (name, msg) => log.prefix(name, indicators.yellow, format(name, msg))
}
