const napi = require('napi-build-utils')
const gyp = require('./gyp')

function runGyp (opts, target, cb) {
  const args = ['node', 'index.js']
  args.push('rebuild')
  if (napi.isNapiRuntime(opts.runtime)) {
    args.push('--napi_build_version=' + target)
  } else {
    args.push('--target=' + target)
  }
  args.push('--target_arch=' + opts.arch)
  if (opts.runtime === 'electron') {
    args.push('--runtime=electron')
    args.push('--dist-url=https://electronjs.org/headers')
  } else if (opts.runtime === 'node') {
    // work around bug introduced in node 10's build https://github.com/nodejs/node-gyp/issues/1457
    args.push('--build_v8_with_gn=false')
    // work around the same kind of bug for node 11
    args.push('--enable_lto=false')
  }
  if (opts.debug) args.push('--debug')

  if (opts.format) args.push('--', '--format', opts.format)

  gyp({
    gyp: opts.gyp,
    runtime: opts.runtime,
    backend: opts.backend,
    log: opts.log,
    args,
    filter: function (command) {
      if (command.name === 'configure') {
        return configurePreGyp(command, opts)
      }
    }
  }, cb)
}

function configurePreGyp (command, opts) {
  const binary = opts.pkg.binary
  if (binary && binary.module_name) {
    command.args.push('-Dmodule_name=' + binary.module_name)
  }
  if (binary && binary.module_path) {
    command.args.push('-Dmodule_path=' + binary.module_path)
  }
}

module.exports = runGyp
