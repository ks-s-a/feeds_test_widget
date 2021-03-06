var path = require("path")

module.exports = {
  entry: {
    app: ['babel-regenerator-runtime', './app/index.js']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader'
    }, {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        'stylus-loader'
      ],
    }]
  },
  devtool: "eval-cheap-module-source-map"

}