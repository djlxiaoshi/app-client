import TagManage from '../pages/tag-manage/TagManage';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'TagList',
    component: TagManage,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: '',
    redirect: 'TagList'
  },
  {
    path: '**',
    redirect: 'TagList'
  }
];
