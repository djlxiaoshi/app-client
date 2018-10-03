import { XS_WIDTH } from './const';

import store from '../../store/index';
import { TOGGLE_SIDE_MENU_VISIBLE } from '../../store/mutation-types';

// 监听窗口改变事件
// 加入节流 todo

window.addEventListener('resize', function () {
  const clientWidth = document.body.clientWidth;

  if (XS_WIDTH < clientWidth) {
    store.commit(TOGGLE_SIDE_MENU_VISIBLE, false);
  }
});
