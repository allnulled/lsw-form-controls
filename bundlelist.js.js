const { resolve } = require(__dirname + "/bundler.utils.js");

module.exports = [
  __dirname + "/api/api.js",
  __dirname + "/directives/v-form-point/v-form-point.js",
  __dirname + "/directives/v-form-control/v-form-control.js",
  __dirname + "/directives/v-form-input/v-form-input.js",
  __dirname + "/directives/v-form-error/v-form-error.js",
  __dirname + "/lsw-form-controls.components.js",
]