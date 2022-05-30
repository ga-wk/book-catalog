import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Compiler, WebpackPluginInstance } from "webpack";

const isDevServer = process.env.WEBPACK_SERVE;
const mode = isDevServer ? "development" : "production";
const isDevMode = mode !== "production";

const plugins:
  | (((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance)[]
  | undefined = [];

plugins.push(
  // Создать index.html
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./src/index.html"), // шаблон
    minify: isDevMode
      ? false
      : {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true,
        },
  }),
  new CleanWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new MiniCssExtractPlugin()
);

export default plugins;
