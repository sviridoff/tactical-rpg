module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['source-map-loader'],
      },
    ],
  },
};
