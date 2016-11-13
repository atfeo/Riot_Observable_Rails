module.exports = {
  entry: './src/index.js',
  output: {
    path: '../app/assets/javascripts/webpack',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.tag$/,
        loader: 'tag',
        exclude: /node_modules/,
      },
    ],
  },
};
