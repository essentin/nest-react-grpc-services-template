const { merge } = require('webpack-merge');

module.exports = function (options) {
  return merge(options, {
    module: {
      rules: [
        {
          test: /\.(proto)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },
    resolve: {
      symlinks: false,
    }
  });
};
