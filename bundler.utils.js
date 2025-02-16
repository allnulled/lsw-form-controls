const resolve = function(...args) {
  return require("path").resolve(__dirname, "../../../../..", ...args);
};

module.exports = {
  resolve
};