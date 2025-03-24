const { resolve } = require(__dirname + "/bundler.utils.js");

module.exports = [
  __dirname + "/components/lsw-formtype/lsw-formtype",
  __dirname + "/components/lsw-formtype/partials/lsw-control-error/lsw-control-error",
  __dirname + "/components/lsw-formtype/partials/lsw-control-label/lsw-control-label",
  __dirname + "/components/lsw-formtype/type/lsw-boolean-control/lsw-boolean-control",
  __dirname + "/components/lsw-formtype/type/lsw-date-control/lsw-date-control",
  __dirname + "/components/lsw-formtype/type/lsw-duration-control/lsw-duration-control",
  __dirname + "/components/lsw-formtype/type/lsw-text-control/lsw-text-control",
  __dirname + "/components/lsw-formtype/type/lsw-long-text-control/lsw-long-text-control",
  __dirname + "/components/lsw-formtype/type/lsw-number-control/lsw-number-control",
  __dirname + "/components/lsw-formtype/type/lsw-options-control/lsw-options-control",
  __dirname + "/components/lsw-formtype/type/lsw-ref-list-control/lsw-ref-list-control",
  __dirname + "/components/lsw-formtype/type/lsw-ref-object-control/lsw-ref-object-control",
  __dirname + "/components/lsw-formtype/type/lsw-ref-relation-control/lsw-ref-relation-control",
  // __dirname + "/components/lsw-formtype/type/lsw-ref-source-code-control/lsw-ref-source-code-control",
  __dirname + "/components/lsw-form-builder/lsw-form-builder",
];