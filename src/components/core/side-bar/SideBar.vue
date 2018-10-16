<template>
  <transition name="page-move">
    <div class="side-menu-wrap">
      <side-menu
        active-text-color="#ffd04b"
        :menuConfig="menuConfig">
      </side-menu>
    </div>
  </transition>
</template>

<script>
  import SideMenu from 'components/core/menu/Menu';
  import menuConfig from '../../../router/menu';

  export default {
    components: {
      SideMenu
    },
    data () {
      return {
        menuConfig
      };
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
