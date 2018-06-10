const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const bundleAnalyzerPlugin = process.env.WEBPACK_BUNDLE_ANALYZER
  ? new BundleAnalyzerPlugin()
  : null;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".gif"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          publicPath: "dist",
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["awesome-typescript-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localIdentName:
                process.env.NODE_ENV === "production"
                  ? "[hash:base64]"
                  : "[path][name]__[local]--[hash:base64:5]",
            },
          },
        ],
      },
    ],
  },
  plugins: [bundleAnalyzerPlugin].filter(Boolean),
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            inline: 1, // Avoid assignment to constant variable error on compress.
          },
        },
      }),
    ],
  },
};
