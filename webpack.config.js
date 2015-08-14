module.exports = {
  entry: './src/app',
  output: {
    path: __dirname + '/release',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.coffee/, exclude: /node_modules/, loader: 'coffee-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'],
    moduleDirectories: ['node_modules', 'src']
  }
}
