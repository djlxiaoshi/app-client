/*
*  用户相关路由
* */

import UserInfo from 'pages/users/Info';

export default [
  {
    path: 'info',
    component: UserInfo,
    meta: {
      activeMenu: '/user/info'
    }
  },
  {
    path: '',
    redirect: 'info'
  },
  {
    path: '**',
    redirect: 'info'
  }
];
