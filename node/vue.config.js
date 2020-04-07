const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: 'https://localhost:3000/',
    }
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    //     }
    // }
}
