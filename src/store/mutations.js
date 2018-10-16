import { TOGGLE_SIDE_MENU_VISIBLE, ACTIVE_MENU, TOGGLE_IS_MINI_WIDTH } from './mutation-types';

export default {
  [TOGGLE_SIDE_MENU_VISIBLE] (state, status) {
    state.sideMenuVisible = status;
  },
  [ACTIVE_MENU] (state, name) {
    state.activeMenu = name;
  },
  [TOGGLE_IS_MINI_WIDTH] (state, status) {
    state.isMiniWidth = status;
  }
};
