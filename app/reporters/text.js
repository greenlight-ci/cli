const chalk = require('chalk')
const table = require('text-table')

module.exports = (results) => {
  console.log()

  for (const {name, run, issues} of results) {
    if (!run) {
      console.log(chalk`{bold {yellow ⏺} ${name}} {gray.italic > skipped: no matching context}`)
      console.log()
      continue
    }

    if (issues.length === 0) {
      console.log(chalk`{bold {green ⏺} ${name}} {gray > no issues found}`)
      console.log()
      continue
    }

    console.log(chalk`{bold {red ⏺} ${name}} {red ${issues.length} issues found}`)
    console.log()

    const sorted = {}

    issues.forEach(issue => {
      if (!sorted[issue.context.path]) sorted[issue.context.path] = []

      sorted[issue.context.path].push(issue)
    })

    for (const path of Object.keys(sorted)) {
      console.log(chalk`{magenta.underline ${path}}`)
      const lines = []

      for (const {id, name, description, severity, context} of sorted[path]) {
        lines.push([
          ' ',
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
