/*
*  总体描述：关于权限的问题可以分为大的三类
*  1 不需要登录就可以进入的（例如登录、注册页）
*  2 需要登录才能进入的 （例如用户信息页）
*  3 用户登录之后根据用户角色才能进入的 （VIP页）
*
*   那么我们怎么知道哪些路由是需要登录，哪些路由组件是需要更高的权限呢，那就是在路由配置的meta属性
*   中添加配置例如：meta: { RequiredLogin: true, RequiredPermission: false }
*
*   首先管理平台是肯定要做登录拦截的，即在用户处于登录状态才能进入主系统
*   那么就要在跟路由('/')下做路由拦截，根据路由的meta信息决定是否需要登录等等
* */

import Router from 'vue-router';

import App from '../App';
import Framework from '../pages/Index';
import UserLogin from 'pages/users/Login';
import UserRegister from 'pages/users/Register';
import NoPermission from '../components/common/exception/NoPermission';

import componentRoutes from './component.js';
import blogRoutes from './blog.js';
import userRoutes from './user.js';
import adminRoutes from './admin.js';

import routerIntercept from './intercept';

let routes = [
  {
    path: 'component/',
    icon: 'icon-36',
    label: '收藏系统',
    component: Framework,
    children: componentRoutes
  },
  {
    path: 'blog/',
    icon: 'icon-36',
    label: '博客系统',
    component: Framework,
    children: blogRoutes
  },
  {
    path: 'user',
    hidden: true,
    component: Framework,
    children: userRoutes
  },
  {
    path: 'admin',
    label: '管理系统',
    component: Framework,
    children: adminRoutes
  },
  {
    path: '/login',
    hidden: true,
    component: UserLogin,
    meta: { NoRequiredLogin: true }
  },
  {
    path: '/register',
    hidden: true,
    component: UserRegister,
    meta: { NoRequiredLogin: true }
  },
  {
    path: '/NoPermission',
    component: NoPermission
  },
  {
    path: '',
    redirect: 'component',
    hidden: true
  },
  {
    path: '**',
    redirect: 'component',
    hidden: true
  }
];

const rootRoute = [
  {
    path: '/',
    component: App,
    children: routes
  }
];

const router = new Router({
  routes: rootRoute
});

// 路由拦截
routerIntercept(router);

export default router;
