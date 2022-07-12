const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let mode = "development";

const isProd = process.env.NODE_ENV === "production";

const filename = isProd ? "[name].[contenthash].css" : "[name].css";

let target = "web";

if (isProd) {
  mode = "production";
  target = "browserslist";
}

if (isProd) {
  mode = "production";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
    favicon: "./public/favicon.svg",
  }),
  new MiniCssExtractPlugin({
    filename: filename,
  }),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target,
  plugins,
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  devtool: isProd ? null : "source-map",

  devServer: {
    hot: true,
    open: true,
    compress: true,
    liveReload: false,
    client: {
      overlay: true,
    },
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "public/assets/"),
      styles: path.resolve(__dirname, "public/assets/styles/"),
      img: path.resolve(__dirname, "public/assets/img"),
    },
  },
};
