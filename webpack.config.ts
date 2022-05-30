// webpack.config.js
import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import rules from "./webpack.rules";
import plugins from "./webpack.plugins";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevServer = process.env.WEBPACK_SERVE;

const mode = isDevServer ? "development" : "production";

const config: Configuration = {
  mode,
  entry: {
    main: path.resolve(__dirname, "./src/index.tsx"),
  },
  devtool: "inline-source-map",
  module: {
    rules,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins,
  // Сервер для разработки
  devServer: {
    static: path.join(__dirname, "build"),
    compress: false,
    port: 8888,
    hot: true,
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
};

export default config;
