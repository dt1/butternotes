// vue imports and config
import Vue from 'vue'
import App from '@/App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

// page imports
import HomePage from '@/components/pages/HomePage'
import Notation from '@/components/pages/Scales'
import Metronome from '@/components/pages/Metronome'

import Rsmg from '@/components/notation/Rsmg'

import { FoundationCSS } from  '@/../node_modules/foundation-sites/dist/css/foundation.min.css'
Vue.component('foundation-css', FoundationCSS)

import Foundation from 'foundation-sites'
Vue.prototype.$foundation = Foundation

import SideNav from '@/components/layout/SideNav'
Vue.component('side-nav', SideNav);

import AmazonAd from '@/components/layout/AmazonAd'
Vue.component('amazon-ad', AmazonAd);

const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/',
          components: {
              maininfo: HomePage
          }
        },
        { path: '/metronome',
          components: {
              maininfo: Metronome
          }
        },
        { path: '/lab',
          components: {
              maininfo: Metronome
          }
        },
        { path: '/random-sheet-music-generator',
          components: {
              maininfo: Metronome
          }
        },

        { path: '/lab/random-sheet-music-generator',
          components: {
              maininfo: Rsmg
          }
        },
        { path: '/:scale/:stype/',
          components: {
              maininfo: Notation
          }
        },
        { path: '/:scale/:stype/:ntype',
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
