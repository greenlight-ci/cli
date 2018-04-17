const { test } = require('tap')
const strip = require('strip-ansi')

const reports = [
  {
    plugin: 'b',
    issues: []
  },
  {
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
      },
      {
        id: '1234567',
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
]

test('text reporter', assert => {
  assert.plan(1)

  const stdout = []

  const text = require('../../app/reporters/text')

  text(reports, { write: str => stdout.push(strip(str.trim())) })

  const expected = [
    '⏺ a issues: 2',
    '',
    'path/to/file.js',
    '',
    '2:10  critical  Extra semicolon  semi\n2:10  critical  Extra semicolon  semi',
    ''
  ]

  assert.same(stdout, expected)
})
