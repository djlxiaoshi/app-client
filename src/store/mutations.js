import { TOGGLE_SIDE_MENU_VISIBLE, ACTIVE_MENU, TOGGLE_IS_MINI_WIDTH,
  SET_USER_MSG } from './mutation-types';

export default {
  [TOGGLE_SIDE_MENU_VISIBLE] (state, status) {
    state.sideMenuVisible = status;
  },
  [ACTIVE_MENU] (state, name) {
    state.activeMenu = name;
  },
  [TOGGLE_IS_MINI_WIDTH] (state, status) {
    state.isMiniWidth = status;
  },
  [SET_USER_MSG] (state, user) {
    state.user = user;
  }
};
