import Vue from 'vue';
import Router from 'vue-router';

import FooterRoute from './footer.route';
import Test from '@/pages/test/Test';

Vue.use(Router);

const commonRoute = [
  {
    path: '/test',
    component: Test
  }
];
const routes = commonRoute.concat(FooterRoute);

export default new Router({
  routes: routes
});
