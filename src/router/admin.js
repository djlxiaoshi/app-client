import MenuList from '../pages/admin-system/menu-manage/MenuList';
import CreateMenu from '../pages/admin-system/menu-manage/CreateMenu';
import UpdateMenu from '../pages/admin-system/menu-manage/UpdateMenu';

import routerNameConfig from './config';

export default [
  {
    path: 'CreateMenu',
    component: CreateMenu,
    name: routerNameConfig.AdminCreateMenuRouterName,
    meta: {
      permissionList: ['admin']
    }
  },
  {
    path: 'MenuList',
    component: MenuList,
    name: routerNameConfig.AdminMenuListRouterName,
    meta: {
      permissionList: ['admin']
    }
  },
  {
    path: 'UpdateMenu/:id',
    component: UpdateMenu,
    name: routerNameConfig.AdminUpdateMenuRouterName,
    meta: {
      permissionList: ['admin']
    }
  }
];
