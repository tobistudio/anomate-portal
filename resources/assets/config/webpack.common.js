const paths = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [
      paths.scripts + "/bootstrap.js", 
      paths.styles+ "/_main.scss"
  ],
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    chunkFilename: "[name].bundle.js",
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          // Disables attributes processing
          sources: false,
          esModule: false,
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: 
        [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true,
                url: false,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
        ],
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },
  resolve: {
    modules: [paths.scripts, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.scripts,
    },
  },
};
