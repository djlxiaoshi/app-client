
import Home from '../pages/home/Home';
import Explore from '../pages/explore/Explore';
import Attention from '../pages/attention/Attention';
import AboutMe from '../pages/about-me/AboutMe';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';
export default [
  {
    path: '/home',
    icon: 'icon-36',
    label: '我的书签',
    component: Home,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: '/explore',
    icon: 'icon-yduifaxian',
    label: '发现',
    component: Explore,
    beforeEnter: (to, from, next) => {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: '/favorite',
    icon: 'icon-faxian-yanjing',
    label: '关注',
    component: Attention,
    beforeEnter: (to, from, next) => {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: '/about-me',
    icon: 'icon-wo',
    label: '我',
    component: AboutMe,
    beforeEnter: (to, from, next) => {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: '**',
    redirect: '/home'
  }
];
