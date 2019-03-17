import CreateMenu from '../pages/admin/menu-manage/CreateMenu';

export default [
  {
    path: 'CreateMenu',
    component: CreateMenu,
    meta: {
      permissionList: ['admin']
    }
  }
];
