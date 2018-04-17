const chalk = require('chalk')
const Logress = require('logress')

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

const format = (name, msg) => chalk`{bold ${name}} {gray ${msg.trim()}}`

module.exports = {
  start: (name, msg) => log.start(name, format(name, msg)),
  update: (name, msg) => log.update(name, format(name, msg)),
  info: (name, msg) => log.prefix(name, indicators.blue, format(name, msg)),
  success: (name, msg) => log.prefix(name, indicators.green, format(name, msg)),
  warn: (name, msg) => log.prefix(name, indicators.yellow, format(name, msg)),
  fail: (name, msg, error) => log.prefix(name, indicators.red, format(name, msg)),
  end: () => log.end()
}
