// vue imports and config
import Vue from 'vue'
import App from '@/App'
import { router } from '@/router/router.js'

Vue.config.productionTip = false

import { FoundationCSS } from  '@/../node_modules/foundation-sites/dist/css/foundation.min.css'
Vue.component('foundation-css', FoundationCSS)

import Foundation from 'foundation-sites'
Vue.prototype.$foundation = Foundation

import SideNav from '@/components/layout/SideNav'
Vue.component('side-nav', SideNav);

import AmazonAd from '@/components/layout/AmazonAd'
Vue.component('amazon-ad', AmazonAd);

// adsense
import Ads from 'vue-google-adsense'
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
