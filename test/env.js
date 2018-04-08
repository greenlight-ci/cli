const tap = require('tap')

const mod = '../app/env'

tap.afterEach(done => delete require.cache[require.resolve(mod)] && done())

tap.test('env defaults', assert => {
  assert.plan(1)

  const env = require(mod)

  assert.equal(env.GREENLIGHT_TEMP, '/tmp/greenlight')
})

tap.test('env overwrite', assert => {
  process.env.GREENLIGHT_TEMP = 'foo'

  assert.plan(1)

  const env = require(mod)

  assert.equal(env.GREENLIGHT_TEMP, 'foo')
})
