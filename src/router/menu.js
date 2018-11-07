
import Home from '../pages/home/Home';
import Explore from '../pages/explore/Explore';
import Attention from '../pages/attention/Attention';
import ItemSettings from '../pages/item-setting/ItemSettings';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';
export default [
  {
    path: 'home',
    alias: '/home',
    icon: 'icon-36',
    label: '我的书签',
    component: Home,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'explore',
    alias: '/explore',
    icon: 'icon-yduifaxian',
    label: '发现',
    component: Explore,
    beforeEnter: (to, from, next) => {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'favorite',
    alias: '/favorite',
    icon: 'icon-faxian-yanjing',
    label: '关注',
    component: Attention,
    beforeEnter: (to, from, next) => {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'item-setting',
    icon: 'icon-add',
    alias: '/item-setting',
    label: '添加收藏',
    name: 'itemSetting',
    component: ItemSettings,
    beforeEnter: (to, from, next) => {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
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
