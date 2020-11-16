'use strict';

const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: path.join(__dirname, 'src/main.js'),
    }
  },
  configureWebpack: ({
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      },
      extensions: ['.js', '.vue', '.json']
    },
    devtool: 'source-map'
  })
};
