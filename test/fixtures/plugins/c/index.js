#!/usr/bin/env node

const report = {
  version: '1.0.0',
  plugin: 'a',
  issues: [
    {
      id: '123456',
      name: 'semi',
      description: 'Extra semicolon',
      severity: 'critical',
      context: {
        type: 'file',
        path: 'path/to/file.js',
        start: {
          line: 2,
          column: 10
        },
        end: {
          line: 2,
          column: 11
        }
      }
    }
  ]
}

console.log(JSON.stringify(report))
