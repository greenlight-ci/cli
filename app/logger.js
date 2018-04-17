const chalk = require('chalk')
const Logress = require('logress')
const strip = require('strip-ansi')
const test = require('color-support')

const colors = (!!+process.env.GREENLIGHT_COLORS || test().hasBasic) && !+process.env.GREENLIGHT_NO_COLORS

// initiate logger
const log = new Logress({
  stream: process.stderr,
  spinner: {
    interval: 100,
    frames: [
      chalk`{gray ⏺}`,
      chalk`{gray.dim ⏺}`
    ]
  }
})

const indicators = {
  'blue': chalk`{blue ⏺}`,
  'green': chalk`{green ⏺}`,
  'red': chalk`{red ⏺}`,
  'yellow': chalk`{yellow ⏺}`
}

const format = (name, msg) => {
  const output = chalk`{bold ${name}} {gray ${msg.trim()}}`
  return colors ? output : strip(output)
}

module.exports = {
  start: (name, msg) => log.start(name, format(name, msg)),
  update: (name, msg) => log.update(name, format(name, msg)),
  info: (name, msg) => log.prefix(name, indicators.blue, format(name, msg)),
  success: (name, msg) => log.prefix(name, indicators.green, format(name, msg)),
  warn: (name, msg) => log.prefix(name, indicators.yellow, format(name, msg)),
  fail: (name, msg, error) => log.prefix(name, indicators.red, format(name, msg)),
  end: () => log.end()
}
