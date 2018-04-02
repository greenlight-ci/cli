const { parse, discover } = require('@greenlight/config-loader')
const { Promise } = require('smart-promise')
const make = require('make-dir')

const { GREENLIGHT_TEMP } = require('../env')
const run = require('../run')
const reporters = require('../reporters/')

exports.command = 'filesystem [source]'

exports.describe = 'run plugin analysis for "filesystem" at [source]'

exports.builder = (yargs) => {
  yargs.positional('source', {
    type: 'string',
    description: 'source path to use'
  })

  yargs.options({
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
}

exports.handler = async argv => {
  // we don't set the default in yargs to keep the help output clean
  argv.source = argv.source || process.cwd()

  // attempt to read config
  const config = argv.config ? await parse(argv.config) : await discover(argv.source)

  // make temp dir
  await make(GREENLIGHT_TEMP)

  // loop through all plugins
  let plugins = Object.entries(config.plugins)

  // only select enabled plugins
  plugins = plugins.filter(([key, value]) => value === true || (typeof value === 'object' && value.enabled !== false))

  const results = await Promise.all(plugins.map(([name, settings]) => run(name, settings, argv.source)))

  // run reporter
  reporters[argv.reporter].call(null, results)

  // exit
  process.exit(argv['soft-exit'] ? 0 : 1)
}
