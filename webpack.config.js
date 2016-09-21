module.exports = {
  entry: "./build/src/web.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  externals: {
    "typescript": "ts"
  }
}
