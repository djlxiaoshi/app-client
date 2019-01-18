/*
*  用户相关路由
* */

import Login from 'components/core/login/Login';
import Register from 'components/core/register/Register';
import UserInfo from 'pages/UserInfo/UserInfo';

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/info',
    component: UserInfo
  }
];
