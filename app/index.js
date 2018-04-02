#!/usr/bin/env node

const { red, bold } = require('chalk')

require('yargs') // eslint-disable-line no-unused-expressions
  .options({
    config: {
      type: 'strig',
      description: 'path to greenlight config file'
    },

    reporter: {
      type: 'string',
      description: 'Use the specified output reporter',
      choices: ['text', 'json', 'html', 'silent'],
      default: 'text'
    },

    'soft-exit': {
      type: 'boolean',
      description: 'do not exit(1) if issues are found'
    }
  })
  .commandDir('commands')
  .demandCommand()
  .help()
  .fail((message, error, yargs) => {
    console.error(`Oops! ${red(error ? error.message : message)}\n\n${bold('Usage')}:\n`)
    yargs.showHelp()
    process.exit(1)
  })
  .argv
