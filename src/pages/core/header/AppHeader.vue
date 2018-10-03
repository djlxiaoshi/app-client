<template>
  <header class="app-header">
    <el-row type="flex" align="middle" class="hidden-xs-only">
      <el-col  :span="14">
        <el-menu
          :router="true"
          :default-active="activeMenu"
          class="header-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item :index="menu.path" v-for="(menu, index) in menuConfig" :key="index">
            {{ menu.label }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8">
        <div class="header-search">
          <el-input placeholder="搜索" v-model="searchText" suffix-icon="el-input__icon"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="avatar-wrap">
          <el-dropdown>
            <a class="user-avatar"></a>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="hidden-sm-and-up">
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
  </header>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { TOGGLE_SIDE_MENU_VISIBLE, ACTIVE_MENU } from '../../../store/mutation-types';
  import menuConfig from '../../../router/menu';
  export default {
    components: {
    },
    data () {
      return {
        searchText: '',
        menuConfig
      };
    },
    created () {

    },
    computed: {
      ...mapState([
        'sideMenuVisible',
        'activeMenu'
      ]),
      menuClass () {
        return this.sideMenuVisible ? 'icon-x' : 'icon-menu';
      }
    },
    methods: {
      ...mapMutations({
        'toggleSideMenuVisible': TOGGLE_SIDE_MENU_VISIBLE,
        'setActiveMenu': ACTIVE_MENU
      }),
      handleSelect (key) {
        this.setActiveMenu(key);
      },
      toggleSideMenu () {
        this.toggleSideMenuVisible(!this.sideMenuVisible);
      }
    }
  };
</script>

<style scoped lang="less">
  .app-header {
    height: 100%;
    max-width: 960px;
    margin: 0 auto;
    /deep/ .el-col {
      padding: 0 20px;
    }
    .header-search {

    }
    .avatar-wrap {
      .user-avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: lightgreen;
      }
    }

    .hidden-sm-and-up {
      height: 100%;
      color: #ffffff;
      .menu-col {
        .iconfont {
          font-size: 24px !important;
          cursor: pointer;
        }
      }
      .app-name {
        text-align: center;
      }
      .header-login {
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
