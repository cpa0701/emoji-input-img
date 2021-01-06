'use strict'
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      axios: 'axios'
    }
  },
}
