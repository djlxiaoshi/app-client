import Vue from 'vue';
import Router from 'vue-router';

import MenuRoute from './menu';
import MainContent from 'pages/MainContent';
import Login from 'components/core/login/Login';
import Register from 'components/core/register/Register';
import Test from 'pages/test/Test';

Vue.use(Router);

const routes = [
  {
    path: '/app',
    component: MainContent,
    children: MenuRoute
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '**',
    component: MainContent
  }
];

const router = new Router({
  routes: routes
});

// router.beforeEach((to, from, next) => {
// });

export default router;
