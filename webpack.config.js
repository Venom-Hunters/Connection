var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.resolve("core/app/"),
  entry: "./index.jsx",
  output: {
    path: path.resolve("public/assets/js/"),
    publicPath: "public/assets/js/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "public"
  },
  module: {
    preLoaders: [{
      test: /(\.js$)/,
      exclude: /(node_modules|server|signalmaster)/,
      loader: "jshint-loader"
    }],
    loaders: [{
      test: /(\.jsx$|\.js$)/,
      exclude: /(node_modules|server|signalmaster)/,
      loaders: ["babel-loader"]
    }, {
      test: /\.scss$/,
      exclude: /(node_modules|server|signalmaster)/,
      loader: "style-loader!css-loader!sass-loader"
    }]
  },
  resolve: {
    extensions: [
      "", ".js", ".jsx"
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true
};
