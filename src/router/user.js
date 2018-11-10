/*
*  用户相关路由
* */

import Login from 'components/core/login/Login';
import Register from 'components/core/register/Register';

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
];
