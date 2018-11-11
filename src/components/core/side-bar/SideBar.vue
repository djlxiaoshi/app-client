<template>
  <transition name="page-move">
    <div class="side-menu-wrap">
      <base-menu
        active-text-color="#ffd04b"
        @menuSelect = "menuSelect"
        :menuConfig="menuConfig">
      </base-menu>
    </div>
  </transition>
</template>

<script>
  import BaseMenu from 'components/core/menu/Menu';
  import menuConfig from '../../../router/menu';

  import { mapMutations } from 'vuex';
  import { TOGGLE_SIDE_MENU_VISIBLE } from 'store/mutation-types';

  export default {
    components: {
      BaseMenu
    },
    data () {
      return {
        menuConfig
      };
    },
    methods: {
      ...mapMutations({
        'setSideMenuVisible': TOGGLE_SIDE_MENU_VISIBLE
      }),
      menuSelect (menuName) {
        this.setSideMenuVisible(false);
      }
    }
  };
</script>

<style scoped lang="less">
  .page-move-enter, .page-move-leave-active {
    transform: translate(-100%, 0 )
  }
  .page-move-enter-active, .page-move-leave-active {
    transition: transform .3s
  }

  .side-menu-wrap {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
