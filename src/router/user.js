/*
*  用户相关路由
* */

import UserLogin from 'pages/users/Login';
import UserRegister from 'pages/users/Register';
import UserInfo from 'pages/users/Info';

export default [
  {
    path: 'login',
    component: UserLogin
  },
  {
    path: 'register',
    component: UserRegister
  },
  {
    path: 'info',
    component: UserInfo
  }
];
