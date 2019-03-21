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
*
*
* */

import Router from 'vue-router';

import App from '../App';
import Framework from '../pages/Index';
import UserLogin from 'pages/users/Login';
import UserRegister from 'pages/users/Register';

import componentRoutes from './component.js';
import tagRoutes from './tag.js';
import blogRoutes from './blog.js';
import userRoutes from './user.js';
import adminRoutes from './admin.js';

import http from '../assets/js/http';
import { SET_USER_MSG, SET_MENU_LIST } from '../store/mutation-types';
import store from '../store/index';

function userIsLogin (next) {
  const { xhrInstance } = http({
    url: '/user/isLogin'
  });
  return xhrInstance;
}

function getInitMenu () {
  const { xhrInstance } = http({
    url: '/getMenusBySystem'
  });

  return xhrInstance;
}

async function getUserMsg ()  {
  return Promise.all([userIsLogin(), getInitMenu()]);
}

let routes = [
  {
    path: 'component/',
    icon: 'icon-36',
    label: '组件管理',
    activeKey: '/component/ComponentsList',
    component: Framework,
    children: componentRoutes
  },
  {
    path: 'tag/',
    icon: 'icon-36',
    label: '分类管理',
    activeKey: '/tag/TagsList',
    component: Framework,
    children: tagRoutes
  },
  {
    path: 'blog/',
    icon: 'icon-36',
    label: '文章列表',
    activeKey: '/blog/ArticleList',
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
    hidden: true,
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

// 全局拦截
router.beforeEach( async (to, from, next) => {
  const matched = to.matched;
  const finallyMatched = to.matched[matched.length - 1];

  if (finallyMatched.meta.NoRequiredLogin) {
    next();
  } else {
    // 获取用户是否处于登录状态
    if (!store.state.user) {
      const result = await getUserMsg();
      store.commit(SET_USER_MSG, result[0]);
      store.commit(SET_MENU_LIST, result[1]);
    }

    if (store.state.user) {
      if (!finallyMatched.meta.permissionList) {
        // 不需要权限
        next();
      } else {
        if (!!~finallyMatched.meta.permissionList.indexOf(store.state.user.role)) {
          // 权限通过
          next();
        } else {
          // 到权限不足提示页面，点击返回首页
        }
      }
    }
  }
});

export { router, routes };
