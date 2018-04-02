const chalk = require('chalk')

module.exports = (results) => {
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
      console.log(chalk`- {magenta ${context.path}}:{gray ${context.start.line}:${context.start.column}}`)
      console.log(chalk`  [{gray ${id}}] {red ${severity}} ${description} {gray ${name}}`)
      console.log()
    }
    console.log()
  }
}
