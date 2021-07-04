const entryPoints = require('../entryPoints')

module.exports = {
  target: "electron-main",
  entry: entryPoints.entry.main,
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
}
