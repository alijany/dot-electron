const entryPoints = require('../entryPoints')

module.exports = {
  entry: entryPoints.entry.main,
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  }
}
