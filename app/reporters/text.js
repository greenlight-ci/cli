const chalk = require('chalk')
const strip = require('strip-ansi')
const table = require('text-table')
const test = require('color-support')

const colors = test().hasBasic

const log = message => console.log(colors ? message : strip(message))

module.exports = (results) => {
  for (const { plugin, issues } of results) {
    if (issues.length > 0) {
      log(chalk`{bold {red ⏺} ${plugin}} {red issues: ${issues.length}}`)
      console.log()

      const sorted = {}

      issues.forEach(issue => {
        if (!sorted[issue.context.path]) sorted[issue.context.path] = []

        sorted[issue.context.path].push(issue)
      })

      for (const path of Object.keys(sorted)) {
        log(chalk`{magenta ${path}}`)
        console.log()

        const lines = []

        for (const { name, description, severity, context } of sorted[path]) {
          lines.push([
            chalk`{gray ${context.start.line}:${context.start.column}}`,
            chalk`{red ${severity}}`,
            description,
            chalk`{gray ${name}}`
          ])
        }

        log(table(lines))
        console.log()
      }
    }
  }
}
