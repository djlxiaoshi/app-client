<template>
  <el-row type="flex" align="middle" class="normal-header">
    <el-col  :span="14">
      <header-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="horizontal"
        :menuConfig="menuConfig"></header-menu>
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
</template>

<script>
  import HeaderMenu from 'components/core/menu/Menu';
  import menuConfig from 'router/menu';
  import { mapState, mapMutations } from 'vuex';
  import { ACTIVE_MENU } from 'store/mutation-types';

  export default {
    components: {
      HeaderMenu
    },
    data () {
      return {
        searchText: '',
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
  .normal-header {
    height: 100%;
    color: #ffffff;
    .menu-col {
      text-align: center;
    }
    .app-name {
      text-align: center;
    }
    .header-login {
      text-align: center;
      cursor: pointer;
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
  }
</style>
