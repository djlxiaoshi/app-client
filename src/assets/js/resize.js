import { XS_WIDTH } from './const';

import store from '../../store/index';
import { TOGGLE_SIDE_MENU_VISIBLE, TOGGLE_IS_MINI_WIDTH } from 'store/mutation-types';

function setIsMiniWidth () {
  const clientWidth = document.body.clientWidth;
  store.commit(TOGGLE_IS_MINI_WIDTH, clientWidth < XS_WIDTH);
}

// 当窗口变大超过MiniWidth关闭侧边栏
function hiddenSideBar () {
  const clientWidth = document.body.clientWidth;

  if (clientWidth > XS_WIDTH) {
    store.commit(TOGGLE_SIDE_MENU_VISIBLE, false);
  }
}
// 设置DOM加载完毕初始状态值
window.addEventListener('DOMContentLoaded', function () {
  setIsMiniWidth();
});

// 监听窗口改变事件
// 加入节流 todo

window.addEventListener('resize', function () {
  setIsMiniWidth();
  hiddenSideBar();
});
