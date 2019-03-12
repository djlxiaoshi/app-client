import CreateComponent from '../pages/component-system/component-manage/CreateComponent';
import ComponentsList from '../pages/component-system/component-manage/ComponentsList';
import UpdateComponent from '../pages/component-system/component-manage/UpdateComponent';
import ViewComponent from '../pages/component-system/component-manage/ViewComponent';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'ComponentsList',
    component: ComponentsList,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'CreateComponent',
    component: CreateComponent
  },
  {
    path: 'UpdateComponent/:id',
    component: UpdateComponent
  },
  {
    path: 'ViewComponent/:id',
    component: ViewComponent
  },
  {
    path: '',
    redirect: 'ComponentsList'
  },
  {
    path: '**',
    redirect: 'ComponentsList'
  }
];
