import Vue from 'vue';
import BScroll from 'better-scroll';

function _initScroll (el) {
  if (!el) {
    return;
  }
  /* eslint-disable no-new */
  new BScroll(el);
}

Vue.directive('scroll', {

  // 当被绑定的元素插入到 DOM 中时
  inserted (el, binding) {
    _initScroll(el);
  },
  updated (el, binding) {
    _initScroll(el);
  }
});
