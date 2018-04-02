#!/usr/bin/env node

const { red, bold } = require('chalk')

require('yargs') // eslint-disable-line no-unused-expressions
  .commandDir('commands')
  .demandCommand()
  .help()
  .fail((message, error, yargs) => {
    console.error(`Oops! ${red(error ? error.message : message)}\n\n${bold('Usage')}:\n`)
    yargs.showHelp()
    process.exit(1)
  })
  .argv
