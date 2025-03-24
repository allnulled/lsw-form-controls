const fs = require("fs");
const { resolve } = require(__dirname + "/bundler.utils.js");

// 1. Bundle components:
require(resolve("dev/bundlers/core/vuebundler.js")).bundle({
  list: __dirname + "/bundlelist.components.js",
  module: true,
  id: "Lsw_formtypes_components",
  output: __dirname + "/lsw-formtypes.components.js",
  ignore: [],
});

// 2. Bundle js:
require(resolve("dev/bundlers/core/htmlbundler.js")).bundle({
  list: __dirname + "/bundlelist.js.js",
  module: true,
  id: "Lsw_formtypes_js",
  output: __dirname + "/lsw-formtypes.js",
  ignore: [],
  wrap: false,
});

// 3. Bundle css:
require(resolve("dev/bundlers/core/htmlbundler.js")).bundle({
  list: __dirname + "/bundlelist.css.js",
  module: false,
  id: "Lsw_formtypes_css",
  output: __dirname + "/lsw-formtypes.css",
  ignore: [],
  wrap: false,
});

Set_license: {
  const package = require(__dirname + "/package.json");
  const prependFileSync = (file, text, encode = "utf8") => fs.writeFileSync(file, text + fs.readFileSync(file).toString(), "utf8");
  const licenseSource = fs.readFileSync(__dirname + "/LICENSE.md").toString();
  prependFileSync(__dirname + "/lsw-formtypes.css", licenseSource, "utf8");
  prependFileSync(__dirname + "/lsw-formtypes.js", licenseSource, "utf8");
}