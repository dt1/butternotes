const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: 'https://127.0.0.1:3000/',
    }

}
