const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: 'https://127.0.0.1:3000/',
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.prettify = false
                return options
        })
  }
}
