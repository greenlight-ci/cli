const chalk = require('chalk')
const table = require('text-table')

module.exports = (results) => {
  console.log()

  for (const {name, issues} of results) {
    if (issues.length > 0) {
      console.log(chalk`{bold {red ⏺} ${name}} {red ${issues.length} issues found}`)
      console.log()

      const sorted = {}

      issues.forEach(issue => {
        if (!sorted[issue.context.path]) sorted[issue.context.path] = []

        sorted[issue.context.path].push(issue)
      })

      for (const path of Object.keys(sorted)) {
        console.log(chalk`{magenta ${path}}`)
        console.log()

        const lines = []

        for (const {id, name, description, severity, context} of sorted[path]) {
          lines.push([
            chalk`{gray ${context.start.line}:${context.start.column}}`,
            chalk`{red ${severity}}`,
            description,
            chalk`{gray ${name}}`
          ])
        }

        console.log(table(lines))
        console.log()
      }
    }
  }
}
