import Vue from 'vue';
import Router from 'vue-router';

import MenuRoute from './menu';
import Test from '@/pages/test/Test';

Vue.use(Router);

const commonRoute = [
  {
    path: '/test',
    component: Test
  }
];
const routes = commonRoute.concat(MenuRoute);

const router = new Router({
  routes: routes
});

// router.beforeEach((to, from, next) => {
// });

export default router;
