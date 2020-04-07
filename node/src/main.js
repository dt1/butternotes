// vue imports and config
import Vue from 'vue'
import App from '@/App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

// page imports
import Notation from '@/components/Notation'
import HomePage from '@/components/HomePage'

// component imports and registration
import { FoundationCSS } from  '@/../node_modules/foundation-sites/dist/css/foundation.min.css'
Vue.component('foundation-css', FoundationCSS)

import SideNav from '@/components/SideNav'
Vue.component('side-nav', SideNav);

const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/',
          components: {
              maininfo: HomePage
          }
        },
        { path: '/:scale/:stype',
          components: {
              maininfo: Notation
          }
        }
    ]
})


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
