import store from '../store';
import { ACTIVE_MENU, SET_ACTIVE_SYSTEM, SET_MENU_LIST, SET_USER_MSG } from '../store/mutation-types';
import http from '../assets/js/http';

/**
 * 检测用户是否登录
 * @param next
 */
function userIsLogin (next) {
  const { xhrInstance } = http({
    url: '/user/isLogin'
  });
  return xhrInstance;
}

/**
 * 设置当前选择系统
 * @param matchedRouter
 */
function setCurrentSystem (matchedRouter) {
  const result = /(?<=\/).*?(?=\/)/.exec(matchedRouter.path);
  if (result) {
    const systemName = result[0];
    store.commit(SET_ACTIVE_SYSTEM, systemName);
  }
}

/**
 * 设置当前激活菜单
 * @param matchedRouter
 */
function setCurrentMenu (matchedRouter) {
  if (matchedRouter.meta.activeMenu) {
    store.commit(ACTIVE_MENU, matchedRouter.meta.activeMenu);
  }
}

function goToFirstPage () {
  const systemList = store.state.menuList;
  for (const system of systemList) {
    if (system.menus) {

    }
  }
}
export default function (router) {
  router.beforeEach(async (to, from, next) => {
    const matched = to.matched;
    const finallyMatched = to.matched[matched.length - 1];
    // 判断是否需要登录
    if (finallyMatched.meta.NoRequiredLogin) {
      next();
    } else {
      // 获取用户是否处于登录状态
      if (!store.state.user) {
        const result = await userIsLogin();
        store.commit(SET_USER_MSG, result);
        store.commit(SET_MENU_LIST, result ? result.menus : []);
      }

      if (store.state.user) {

        // 如果需要权限，且权限不通过
        if (finallyMatched.meta.permissionList
          && finallyMatched.meta.permissionList.indexOf(store.state.user.role) === -1) {
          next('/NoPermission');
        } else {
          // 权限通过 或者 不需要权限

          // 同步activeMenu （包括浏览器直接输入地址和点击菜单）
          setCurrentMenu(finallyMatched);
          // 设置当前选择系统和选择菜单（浏览器直接输入和菜单点击）
          setCurrentSystem(finallyMatched);

          next();
        }
      }
    }
  });
};
