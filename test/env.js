const tap = require('tap')

const mod = '../app/env'

tap.afterEach(done => delete require.cache[require.resolve(mod)] && done())

tap.test('env defaults', assert => {
  assert.plan(2)

  const env = require(mod)

  assert.equal(env.GREENLIGHT_TEMP, '/tmp/greenlight')
  assert.equal(env.GREENLIGHT_DEBUG, false)
})

tap.test('env overwrite', assert => {
  process.env.GREENLIGHT_TEMP = 'foo'
  process.env.GREENLIGHT_DEBUG = 'foo'

  assert.plan(2)

  const env = require(mod)

  assert.equal(env.GREENLIGHT_TEMP, 'foo')
  assert.equal(env.GREENLIGHT_DEBUG, 'foo')
})
