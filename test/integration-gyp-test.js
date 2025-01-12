const test = require('tape')
const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')
const rm = require('rimraf')

const cwd = path.join(__dirname, 'native-module-gyp')

test('can prebuild a gyp native module for node', function (t) {
  rm.sync(path.join(cwd, 'prebuilds'))
  const file = 'native-v1.0.0-node-v57-' + process.platform + '-' + process.arch + '.tar.gz'
  const prebuild = path.join(cwd, 'prebuilds', file)
  // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
  console.log()
  exec('npm run prebuild', { cwd }, function (error, stdout, stderr) {
    t.equal(error, null)
    t.equal(fs.existsSync(prebuild), true)
    t.end()
  })
})

test('can prebuild a gyp native module for electron', function (t) {
  rm.sync(path.join(cwd, 'prebuilds'))
  const file = 'native-v1.0.0-electron-v50-' + process.platform + '-' + process.arch + '.tar.gz'
  const prebuild = path.join(cwd, 'prebuilds', file)
  // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
  console.log()
  exec('npm run prebuild-electron', { cwd }, function (error, stdout, stderr) {
    t.equal(error, null)
    t.equal(fs.existsSync(prebuild), true)
    t.end()
  })
})

test('can prebuild a gyp native module for node with prepack script', function (t) {
  rm.sync(path.join(cwd, 'prebuilds'))
  const file = 'native-v1.0.0-node-v57-' + process.platform + '-' + process.arch + '.tar.gz'
  const prebuild = path.join(cwd, 'prebuilds', file)
  // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
  console.log()
  exec('npm run prebuild-prepack', { cwd }, function (error, stdout, stderr) {
    t.equal(error, null)
    t.equal(fs.existsSync(prebuild), true)
    t.end()
  })
})
