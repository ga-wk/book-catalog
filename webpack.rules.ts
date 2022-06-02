import path from "path";
import { RuleSetRule } from "webpack";

const isDevServer = process.env.WEBPACK_SERVE;
const mode = isDevServer ? "development" : "production";
const isDevMode = mode !== "production";
const filesThreshold = 8196;

const rules: (RuleSetRule | "...")[] | undefined = [];

// ts, babel
rules.push({
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    },
  },
});

// css
rules.push({
  test: /\.css$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: {
          auto: /\.module\.\w+$/,
          getLocalIdent: (
            loaderContext: any,
            _localIdentName: any,
            localName: any,
            options: any
          ) => {
            const request = path
              .relative(options.context || "", loaderContext.resourcePath)
              .replace(`src${path.sep}`, "")
              .replace(".module.css", "")
              .replace(".module.scss", "")
              .replace(/\\|\//g, "-")
              .replace("-index", "")
              .replace(/\./g, "_");
            return `${request}__${localName}`;
          },
        },
      },
    },
  ],
});

// images
rules.push({
  test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: "url-loader",
      options: {
        name: "images/[name].[ext]",
        limit: filesThreshold,
      },
    },
  ],
});

// files
rules.push({
  test: /\.(png|jp(e*)g|svg|gif)$/,
  use: [
    {
      loader: "file-loader",
      // options: {
      //   name: "images/[hash]-[name].[ext]",
      // },
    },
  ],
});

// fonts
rules.push({
  test: /\.(woff2?|eot|f|otf)(\?.*)?$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: filesThreshold,
        name: "fonts/[name].[ext]",
      },
    },
  ],
});

export default rules;
