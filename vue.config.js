'use strict'
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: process.env.NODE_ENV === 'production' ? {
    extract: false,
    sourceMap: false
  } : {},
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      axios: 'axios'
    }
  },
}
