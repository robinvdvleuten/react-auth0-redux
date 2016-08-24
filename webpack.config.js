const path = require('path');
const webpack = require('webpack');

const config = module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: './index.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'AUTH0_CLIENT_ID',
      'AUTH0_DOMAIN',
    ]),
    new webpack.NoErrorsPlugin(),
  ],

  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
}
