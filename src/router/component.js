import CreateComponent from '../pages/component-manage/CreateComponent';
import ComponentsList from '../pages/component-manage/ComponentsList';
import UpdateComponent from '../pages/component-manage/UpdateComponent';
import ViewComponent from '../pages/component-manage/ViewComponent';
import ComponentListByTag from '../pages/component-manage/ComponentListByTag';

import routerNameConfig from './config';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'ComponentList',
    component: ComponentsList,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'CreateComponent',
    name: routerNameConfig.CreateComponentRouterName,
    component: CreateComponent
  },
  {
    path: 'UpdateComponent/:id',
    name: routerNameConfig.UpdateComponentRouterName,
    component: UpdateComponent
  },
  {
    path: 'ViewComponent/:id',
    name: routerNameConfig.ViewComponentRouterName,
    component: ViewComponent
  },
  {
    path: 'ComponentListByTag',
    name: routerNameConfig.ComponentListByTagRouterName,
    component: ComponentListByTag
  },
  {
    path: '',
    redirect: 'ComponentList'
  },
  {
    path: '**',
    redirect: 'ComponentList'
  }
];
