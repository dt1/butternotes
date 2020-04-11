// vue imports and config
import Vue from 'vue'
import App from '@/App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

// page imports
import HomePage from '@/components/pages/HomePage'

import Notation from '@/components/notation/Scales'
import Rsmg from '@/components/notation/Rsmg'

// nav imports
import NoteMenu from '@/components/layout/NoteMenu'

// component imports and registration
import { FoundationCSS } from  '@/../node_modules/foundation-sites/dist/css/foundation.min.css'
Vue.component('foundation-css', FoundationCSS)

import SideNav from '@/components/layout/SideNav'
Vue.component('side-nav', SideNav);

const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/',
          components: {
              maininfo: HomePage
          }
        },
        { path: '/lab/random-sheet-music-generator',
          components: {
              maininfo: Rsmg
          }
        },
        { path: '/:scale/:stype/',
          components: {
              notemenu: NoteMenu,
              maininfo: Notation
          }
        },
        { path: '/:scale/:stype/:ntype',
          components: {
              notemenu: NoteMenu,
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
