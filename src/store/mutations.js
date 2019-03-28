import {
  TOGGLE_SIDE_MENU_VISIBLE, ACTIVE_MENU, SET_ACTIVE_SYSTEM, TOGGLE_IS_MINI_WIDTH,
  SET_USER_MSG, SET_MENU_LIST
} from './mutation-types';

export default {
  [TOGGLE_SIDE_MENU_VISIBLE] (state, status) {
    state.sideMenuVisible = status;
  },
  [ACTIVE_MENU] (state, name) {
    state.activeMenu = name;
  },
  [SET_ACTIVE_SYSTEM] (state, systenName) {
    state.activeSystem = systenName;
  },
  [TOGGLE_IS_MINI_WIDTH] (state, status) {
    state.isMiniWidth = status;
  },
  [SET_USER_MSG] (state, user) {
    state.user = user;
  },
  [SET_MENU_LIST] (state, menuList) {
    state.menuList = menuList;
  }
};
