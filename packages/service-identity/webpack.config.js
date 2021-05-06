const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

module.exports = function (options) {
  return merge(options, {
    target: "node",
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(proto)$/i,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
  });
};
