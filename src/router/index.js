import Router from 'vue-router';

import Test from 'pages/test/Test';

import userRoutes from './user.js';
import menuRoutes from './menu.js';

let routes = [

  {
    path: '/test',
    component: Test
  },
    ...userRoutes,
    ...menuRoutes,
  {
    path: '',
    redirect: '/home',
    hidden: true
  },
  {
    path: '**',
    redirect: '/home',
    hidden: true
  }
];

const router = new Router({
  routes: routes
});

export default router;
