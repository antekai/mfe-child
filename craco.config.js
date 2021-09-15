const { whenProd } = require("@craco/craco");

const TerserPlugin = require("terser-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function ({ env }) {
  return {
    plugins: [],
    webpack: {
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // only enable hot in development
                  hmr: process.env.NODE_ENV === "development",
                  // if hmr does not work, this is a forceful method.
                  reloadAll: true,
                },
              },
              "css-loader",
            ],
          },
        ],
      },
      configure: (webpackConfig, { env, paths }) => {
        return {
          ...webpackConfig,
          entry: {
            main: "./src/index.js",
            child: "./src/ara/index.js",
          },
          output: {
            filename: "[name].bundle.js",
          },
          plugins: [
            ...webpackConfig.plugins,
            new HtmlWebpackPlugin({
              excludeChunks: ["child"],
              template: "./public/index.html",
            }),
          ],
          ...whenProd(
            () => ({
              mode: "production",
              devtool: "hidden-source-map",
              output: {
                ...webpackConfig.output,
                publicPath: `${process.env.REACT_APP_URL}`,
                filename: "[name].bundle.js",
                futureEmitAssets: false,
              },
              optimization: {
                ...webpackConfig.optimization,
                minimizer: [
                  new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true, // Must be set to true if using source-maps in production
                    terserOptions: {
                      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    },
                  }),
                ],
                runtimeChunk: false,
                splitChunks: {
                  cacheGroups: {
                    default: false,
                  },
                },
              },
            }),
            {}
          ),
        };
      },
    },

    jest: {
      configure: (jestConfig, { env, paths, resolve, rootDir }) => {
        return {
          ...jestConfig,
          setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
          setupFiles: [...jestConfig.setupFiles],
        };
      },
    },
  };
};
