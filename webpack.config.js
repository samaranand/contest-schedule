const path = require("path");
const htmlWeb = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/script.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new htmlWeb({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
