// vue imports and config
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// page imports
import HomePage from '@/components/pages/HomePage'
import Notation from '@/components/pages/Scales'
import Metronome from '@/components/pages/Metronome'
// import ComingSoon from '@/components/pages/ComingSoon'
import Articles from '@/components/pages/Articles'
import About from '@/components/pages/About'
import Resources from '@/components/pages/Resources'
import Reviews from '@/components/pages/Reviews'

import Rsmg from '@/components/notation/Rsmg'


const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/',
          components: {
              maininfo: HomePage
          }
        },
        { path: '/about',
          components: {
              maininfo: About
          }
        },
        { path: '/resources',
          components: {
              maininfo: Resources
          }
        },
        { path: '/reviews/:rtype/:article',
          components: {
              maininfo: Reviews
          }
        },
        { path: '/lab',
          components: {
              maininfo: Metronome
          }
        },
        { path: '/lab/metronome',
          components: {
              maininfo: Metronome
          }
        },
        { path: '/lab/random-sheet-music-generator',
          components: {
              maininfo: Rsmg
          }
        },
        { path: '/on-programming/:article',
          components: {
              maininfo: Articles
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


export { router }
