const { test } = require('tap')

test('text reporter', assert => {
  assert.plan(1)

  const stdout = []
  console.log = str => stdout.push(str)

  const json = require('../../app/reporters/json')
  json({ foo: 'bar' })

  assert.equal(stdout.shift(), '{"foo":"bar"}')
})
