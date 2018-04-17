const chalk = require('chalk')
const strip = require('strip-ansi')
const table = require('text-table')
const test = require('color-support')

const severityColors = {
  info: 'blue',
  minor: 'yellow',
  major: 'magenta',
  critical: 'red'
}

module.exports = (results) => {
  for (const { plugin, issues } of results) {
    if (issues.length > 0) {
      if (!issues.find(issue => issue.severity !== 'info')) {
        process.stderr.write(chalk`{bold {blue ⏺} ${plugin}} {blue issues: ${issues.length}}\n`)
      } else {
        process.stderr.write(chalk`{bold {red ⏺} ${plugin}} {red issues: ${issues.length}}\n`)
      }

      process.stderr.write('\n')

      const sorted = {}

      issues.forEach(issue => {
        if (!sorted[issue.context.path]) sorted[issue.context.path] = []

        sorted[issue.context.path].push(issue)
      })

      for (const path of Object.keys(sorted)) {
        process.stderr.write(chalk`{green ${path}}\n`)

        process.stderr.write('\n')

        const lines = []

        for (const { name, description, severity, context } of sorted[path]) {
          lines.push([
            chalk`{gray ${context.start.line}:${context.start.column}}`,
            chalk`{${severityColors[severity]} ${severity}}`,
            description,
            chalk`{gray ${name}}`
          ])
        }

        process.stderr.write(table(lines) + '\n')

        process.stderr.write('\n')
      }
    }
  }
}
