import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
const isProduction = process.env.NODE_ENV == "production";
const config: webpack.Configuration = {
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  mode: isProduction ? "production" : "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'swc-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProduction,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ["postcss-import"],
                sourceMap: isProduction
              }
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isProduction
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      templateContent: `<div id='root'></div>`
    }),
    new MiniCssExtractPlugin()
  ]
};

export default config;