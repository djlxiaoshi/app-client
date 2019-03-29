import CreateMenu from '../pages/admin-system/menu-manage/CreateMenu';
import UpdateMenu from '../pages/admin-system/menu-manage/UpdateMenu';

import SystemList from '../pages/admin-system/system-manage/SystemList';
import CreateSystem from '../pages/admin-system/system-manage/CreateSystem';
import UpdateSystem from '../pages/admin-system/system-manage/UpdateSystem';

import NoPermission from '../components/common/exception/NoPermission';
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
    path: 'UpdateMenu/:id',
    component: UpdateMenu,
    name: routerNameConfig.AdminUpdateMenuRouterName,
    meta: {
      permissionList: ['admin']
    }
  },
  {
    path: 'SystemList',
    component: SystemList,
    name: routerNameConfig.AdminSystemListRouterName,
    meta: {
      permissionList: ['admin'],
      activeMenu: '/admin/SystemList'
    }
  },
  {
    path: 'CreateSystem',
    component: CreateSystem,
    name: routerNameConfig.AdminCreateSystemRouterName,
    meta: {
      permissionList: ['admin']
    }
  },
  {
    path: 'UpdateSystem/:id',
    component: UpdateSystem,
    name: routerNameConfig.AdminUpdateSystemRouterName,
    meta: {
      permissionList: ['admin']
    }
  },
  {
    path: 'NoPermission',
    component: NoPermission
  },
  {
    path: '',
    redirect: 'SystemList'
  }
];
