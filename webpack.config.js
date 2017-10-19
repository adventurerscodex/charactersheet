const path = require('path');
const webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
//   devtool: "source-map",
  context: path.resolve(__dirname, './charactersheet'),
  entry: './app.js' ,
  output: {
    path: path.resolve(__dirname, './dist'),
//     pathinfo: true,
//     sourceMapFilename: "[name].bundle.js.map",
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [
        path.resolve('./charactersheet'),
        path.resolve('./node_modules')
    ]
  },
  plugins: [
      // Injects bundles in your index.html instead of wiring all manually.
      // It also adds hash to all injected assets so we don't have problems
      // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      hash: true
    })
    // TODO: Add this back in when we want to solve this
    // new CircularDependencyPlugin({
    // // exclude detection of files based on a RegExp
    // exclude: /node_modules/,
    // // add errors to webpack instead of warnings
    // failOnError: false
    // })
//       new webpack.optimize.CommonsChunkPlugin({
//         name: 'vendor',
//         minChunks: function isExternal(module) {
//         var context = module.context;
//         if (typeof context !== 'string') {
//             return false;
//         }
//         return context.indexOf('node_modules') !== -1;
//         }
//       })
  ],
  devServer: {
     contentBase: './dist',
     port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {  // for loading in css files
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { // for loading in images
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ],
  },
  externals: {
    jquery: 'jQuery',
    dropbox: 'Dropbox',
    marked: 'marked',
    strophe : "Strophe"
  }
}
