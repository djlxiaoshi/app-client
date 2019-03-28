import CreateComponent from '../pages/collection-system/component-manage/CreateComponent';
import ComponentsList from '../pages/collection-system/component-manage/ComponentsList';
import UpdateComponent from '../pages/collection-system/component-manage/UpdateComponent';
import ViewComponent from '../pages/collection-system/component-manage/ViewComponent';
import ComponentListByTag from '../pages/collection-system/component-manage/ComponentListByTag';
import TagManage from '../pages/collection-system/tag-manage/TagManage';
import NotFoundPage from '../components/common/exception/NotFound';

import routerNameConfig from './config';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'ComponentList',
    component: ComponentsList,
    meta: {
      activeMenu: '/component/ComponentList'
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
    path: 'TagList',
    component: TagManage,
    meta: {
      activeMenu: '/component/TagList'
    }
  },
  {
    path: 'NotFound',
    component: NotFoundPage
  },
  {
    path: '',
    redirect: 'ComponentList'
  },
  {
    path: '**',
    redirect: 'NotFound'
  }
];
