const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: 'https://localhost:3000/',
    }

}
