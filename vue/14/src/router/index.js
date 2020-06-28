import Vue from 'vue'
import Router from 'vue-router'

import PageConfig from '../components/PageConfig';
import PagePlay from '../components/PagePlay';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: PageConfig
        },
        {
            path: '/play',
            name: 'play',
            component: PagePlay
        }
    ]
})