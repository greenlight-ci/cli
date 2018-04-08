const Logress = require('logress')
const chalk = require('chalk')

// initiate logger
const log = new Logress({
  spinner: {
    interval: 200,
    frames: [
      chalk`{white ⏺}`,
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
  return chalk`{bold ${name}} {gray ${msg.trim()}}`
}

module.exports = {
  log,
  start: (name, msg) => log.start(name, format(name, msg)),
  update: (name, msg) => log.update(name, format(name, msg)),

  fail: (name, msg) => log.prefix(name, indicators.red, format(name, msg)),
  info: (name, msg) => log.prefix(name, indicators.blue, format(name, msg)),
  success: (name, msg) => log.prefix(name, indicators.green, format(name, msg)),
  warn: (name, msg) => log.prefix(name, indicators.yellow, format(name, msg))
}
