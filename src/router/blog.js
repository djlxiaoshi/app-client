import ArticleList from '../pages/blog-system/article-manage/ArticleList';
import NotFoundPage from '../components/common/exception/NotFound';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'ArticleList',
    component: ArticleList,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'NotFound',
    component: NotFoundPage,
    // 清空选中状态
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, 'setset');
      next();
    }
  },
  {
    path: '',
    redirect: 'ArticleList'
  },
  {
    path: '**',
    redirect: 'NotFound'
  }
];
