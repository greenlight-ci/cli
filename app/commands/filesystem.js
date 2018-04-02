const { parse, discover } = require('@greenlight/config-loader')
const { Promise } = require('smart-promise')
const chalk = require('chalk')
const make = require('make-dir')

const { GREENLIGHT_TEMP } = require('../env')
const run = require('../run')

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

  Promise
    .all(plugins.map(([name, settings]) => run(name, settings, argv.source)))
    .then(results => {
      if (argv.reporter === 'text') {
        console.log()

        for (const {name, run, issues} of results) {
          if (!run) {
            console.log(chalk`{yellow.bold # ${name}}`)
            console.log(chalk`{gray.italic > skipped: no matching context}`)
            console.log()
            continue
          }

          if (issues.length === 0) {
            console.log(chalk`{green.bold # ${name}}`)
            console.log(chalk`{gray > no issues found}`)
            console.log()
            continue
          }

          console.log(chalk`{red.bold # ${name}}`)
          console.log(chalk`{gray > ${issues.length} issues found:}`)
          console.log()
          for (const {id, name, description, severity, context} of issues) {
            console.log(chalk`- {magenta ${context.path}}:{gray ${context.start.line}:${context.end.line}}`)
            console.log(chalk`  [{gray ${id}}] {red ${severity}} ${description} {gray ${name}}`)
          }
          console.log()
        }
      }

      process.exit(argv['soft-exit'] ? 0 : 1)
    })
}
