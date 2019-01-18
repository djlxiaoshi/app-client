<template>
  <el-row type="flex" align="middle" justify="center" class="mini-header">
    <el-col :span="4">
      <div class="menu-col">
        <i class="iconfont" :class="menuClass" @click="toggleSideMenu"></i>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="app-name">
        简藏
      </div>
    </el-col>
    <el-col :span="6">
      <div class="header-login">
        <a class="user-avatar" v-if="user"></a>
        <div v-else>
          <a>登录</a>
          <a>注册</a>
        </div>
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
        'sideMenuVisible',
        'user'
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
    padding: 0 20px;
    .iconfont {
      font-size: 18px !important;
      cursor: pointer;
      color: #ffffff;
    }
    .app-name {
      text-align: center;
    }
    .header-login {
      text-align: right;
      .user-avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: lightgreen;
      }
    }
  }
</style>
