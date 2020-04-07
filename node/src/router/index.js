import Vue from 'vue'
// import Router from 'vue-router'
import VueRouter from 'vue-router'

import HomePage from '@/components/HomePage'
import Notation from '@/components/Notation'

Vue.use(VueRouter)

Vue.config.productionTip = false

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/',
          component: HomePage,
          name: 'home' },
        { path: '/chromatic-scales/c-chromatic-scale',
          component: Notation,
          // template: NotationTemplate,
          name: 'notation' }
    ]
})
