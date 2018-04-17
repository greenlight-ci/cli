const chalk = require('chalk')
const table = require('text-table')

const severityColors = {
  info: 'blue',
  minor: 'yellow',
  major: 'magenta',
  critical: 'red'
}

module.exports = (results, stdout = process.stdout) => {
  for (const { plugin, issues } of results) {
    if (issues.length > 0) {
      if (!issues.find(issue => issue.severity !== 'info')) {
        stdout.write(chalk`{bold {blue ⏺} ${plugin}} {blue issues: ${issues.length}}\n`)
      } else {
        stdout.write(chalk`{bold {red ⏺} ${plugin}} {red issues: ${issues.length}}\n`)
      }

      stdout.write('\n')

      const sorted = {}

      issues.forEach(issue => {
        if (!sorted[issue.context.path]) sorted[issue.context.path] = []

        sorted[issue.context.path].push(issue)
      })

      for (const path of Object.keys(sorted)) {
        stdout.write(chalk`{green ${path}}\n`)

        stdout.write('\n')

        const lines = []

        for (const { name, description, severity, context } of sorted[path]) {
          lines.push([
            chalk`{gray ${context.start.line}:${context.start.column}}`,
            chalk`{${severityColors[severity]} ${severity}}`,
            description,
            chalk`{gray ${name}}`
          ])
        }

        stdout.write(table(lines) + '\n')

        stdout.write('\n')
      }
    }
  }
}
