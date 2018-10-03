import { TOGGLE_SIDE_MENU_VISIBLE, ACTIVE_MENU } from './mutation-types';

export default {
  [TOGGLE_SIDE_MENU_VISIBLE] (state, status) {
    state.sideMenuVisible = status;
  },
  [ACTIVE_MENU] (state, name) {
    state.activeMenu = name;
  }
};
