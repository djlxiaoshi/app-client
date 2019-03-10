import Router from 'vue-router';

import Collection from '../pages/collection-system/collections-manage/Index';
import collectionRoutes from './collections.js';

import User from 'pages/users/Index';
import userRoutes from './user.js';

let routes = [
  {
    path: '/collections-system/',
    icon: 'icon-36',
    label: '我的收藏',
    activeKey: '/collections-system/CollectionsList',
    component: Collection,
    children: collectionRoutes
  },
  {
    path: '/user/',
    hidden: true,
    component: User,
    children: userRoutes
  },
  {
    path: '',
    redirect: '/collections-system/',
    hidden: true
  },
  {
    path: '**',
    redirect: '/collections-system/',
    hidden: true
  }
];

const router = new Router({
  routes: routes
});

export { router, routes };
