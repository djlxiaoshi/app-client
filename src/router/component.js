import CreateComponent from '../pages/component-manage/CreateComponent';
import ComponentsList from '../pages/component-manage/ComponentsList';
import UpdateComponent from '../pages/component-manage/UpdateComponent';
import ViewComponent from '../pages/component-manage/ViewComponent';
import ComponentListByTag from '../pages/component-manage/ComponentListByTag';

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
    path: 'ComponentListByTag',
    component: ComponentListByTag
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
