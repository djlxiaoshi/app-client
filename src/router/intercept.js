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
    const menuList = store.getters.getMenuList;
    const activeSystem = menuList.find((system) => {
      return system.name === systemName;
    });

    if (activeSystem) {
      store.commit(SET_ACTIVE_SYSTEM, activeSystem);
    } else {
      // 根据路径没有找到对应的系统，则不变 例如用户信息的路径
      const activeSystem = store.getters.getCurrentSystem;
      // 如果当前不存在所在系统
      if (Object.keys(activeSystem).length === 0) {
        store.commit(SET_ACTIVE_SYSTEM, menuList[0]);
      }
    }
  }
}

/**
 * 设置当前激活菜单
 * @param matchedRouter
 */
function setCurrentMenu (matchedRouter) {
  store.commit(ACTIVE_MENU, matchedRouter.path);
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

        try {
          const result = await userIsLogin();
          store.commit(SET_USER_MSG, result);
          store.commit(SET_MENU_LIST, result ? result.menus : []);
        } catch (e) {
          console.error('服务器异常', e);
          next('/NoPermission');
        }
      }

      if (store.state.user) {
        // 如果需要权限，且权限不通过
        if (finallyMatched.meta.permissionList &&
          finallyMatched.meta.permissionList.indexOf(store.state.user.role) === -1) {
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
