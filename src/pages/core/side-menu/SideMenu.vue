<template>
  <transition name="page-move">
    <el-menu
      :router="true"
      :default-active="activeMenu"
      class="side-menu"
      @select="handleSelect"
      active-text-color="#ffd04b">
      <el-menu-item :index="menu.path" v-for="(menu, index) in menuConfig" :key="index">
        {{ menu.label }}
      </el-menu-item>
    </el-menu>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { ACTIVE_MENU } from '../../../store/mutation-types';
  import menuConfig from '../../../router/menu';

  export default {
      name: 'side-menu',
      data () {
        return {
          menuConfig
        };
      },
    computed: {
      ...mapState([
        'activeMenu'
      ])
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': ACTIVE_MENU
      }),
      handleSelect (key) {
        this.setActiveMenu(key);
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

  .side-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
