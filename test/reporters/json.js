const { test } = require('tap')

test('text reporter', assert => {
  assert.plan(1)

  const stdout = []

  const json = require('../../app/reporters/json')
  json({ foo: 'bar' }, { write: str => stdout.push(str) })

  assert.equal(stdout.shift(), '{"foo":"bar"}')
})
