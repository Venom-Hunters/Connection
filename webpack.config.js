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
    preLoaders: [
      {
        test: /(\.jsx$ | \.js$)/,
        exclude: /(node_modules | server | bundle.js)/,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /(\.jsx$ | \.js$)/,
        exclude: /(node_modules | server | bundle.js)/,
        loader: "babel-loader"
      }, {
        test: /\.scss$/,
        exclude: /(node_modules | server)/,
        loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
      }
    ]
  },
  resolve: {
    extensions: [
      "", ".js", ".jsx"
    ],
    alais: {
      skeleton: __dirname + "/node_modules/skeleton-sass/skeleton_template.scss"
    }
  },
  watch: true
};
