<template>
  <el-row type="flex" align="middle" justify="center" class="mini-header">
    <el-col :span="6">
      <div class="menu-col">
        <i class="iconfont" :class="menuClass" @click="toggleSideMenu"></i>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="app-name">
        简藏
      </div>
    </el-col>
    <el-col :span="6">
      <div class="header-login">
        <a>登录</a>
        <a>注册</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { TOGGLE_SIDE_MENU_VISIBLE } from '../../../store/mutation-types';

  export default {
    computed: {
      ...mapState([
        'sideMenuVisible'
      ]),
      menuClass () {
        return this.sideMenuVisible ? 'icon-x' : 'icon-menu';
      }
    },
    methods: {
      ...mapMutations({
        'toggleSideMenuVisible': TOGGLE_SIDE_MENU_VISIBLE
      }),
      toggleSideMenu () {
        this.toggleSideMenuVisible(!this.sideMenuVisible);
      }
    }
  };
</script>

<style scoped lang="less">
  .mini-header {
    color: #ffffff;
    height: 100%;
    .iconfont {
      font-size: 18px !important;
      cursor: pointer;
      color: #ffffff;
    }
    .app-name {
      text-align: center;
    }
  }
</style>
