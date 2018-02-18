/**
 * Webpack Configuration
 * @type {file}
 */

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const nodeEnv = process.env.NODE_ENV || 'development'
const isDebugMode = process.env.DEBUG === 'true'

// entry points
const devEntries = [
  // activate HMR for React
  'react-hot-loader/patch',
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  'webpack-dev-server/client?http://localhost:4000',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  'webpack/hot/only-dev-server',
]

const appEntries = ['./src/main.jsx']

export default {
  entry: isDebugMode
    ? {
      app: appEntries,
      dev: devEntries,
    }
    : {
      app: appEntries,
    },

  output: {
    path: path.join(__dirname, '/dist/demo/'),
    publicPath: '',
    filename: '[name].bundle.js',
  },

  devtool: isDebugMode ? 'source-map' : void 0,

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /.jsx?$/,
        use: [{ loader: 'babel-loader?compact=false' }],
      },
    ],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    // HTMLをコピー
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    // アセットファイルをコピー
    new CopyWebpackPlugin([{ from: './public/assets', to: 'assets' }]),

    // メタ情報をグローバル変数として埋め込む
    // metaReducerに入れるので、そこから使う
    new webpack.DefinePlugin({
      __NODE_ENV__: JSON.stringify(nodeEnv),
      __DEBUG__: JSON.stringify(isDebugMode),
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, '/dist/demo/'),
    compress: true,
    host: 'localhost',
    port: 4000,

    // respond to 404s with index.html
    historyApiFallback: true,

    // enable HMR on the server
    hot: true,
  },
}
