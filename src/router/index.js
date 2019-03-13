import Router from 'vue-router';

import Component from '../pages/component-system/component-manage/Index';
import componentRoutes from './component.js';

import User from 'pages/users/Index';
import userRoutes from './user.js';

let routes = [
  {
    path: '/component-system/',
    icon: 'icon-36',
    label: '组件管理',
    activeKey: '/component-system/ComponentsList',
    component: Component,
    children: componentRoutes
  },
  {
    path: '/user/',
    hidden: true,
    component: User,
    children: userRoutes
  },
  {
    path: '',
    redirect: '/component-system/',
    hidden: true
  },
  {
    path: '**',
    redirect: '/component-system/',
    hidden: true
  }
];

const router = new Router({
  routes: routes
});

export { router, routes };
