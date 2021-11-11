const { register } = require("@swc-node/register/register")
const { readDefaultTsConfig } = require("@swc-node/register/read-default-tsconfig")
const path = require("path")

register(readDefaultTsConfig(path.resolve("webpack.tsconfig.json")))
module.exports = require("./webpack.analyzer.ts").default
