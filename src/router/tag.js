import TagManage from '../pages/component-system/tag-manage/TagManage';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'TagsList',
    component: TagManage,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: '',
    redirect: 'TagsList'
  },
  {
    path: '**',
    redirect: 'TagsList'
  }
];
