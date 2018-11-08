<template>
  <el-row type="flex" align="middle" justify="center" class="normal-header">
    <el-col :span="16">
      <header-menu
        text-color="#fff"
        background-color="#545c64"
        active-text-color="#ffd04b"
        mode="horizontal"
        :menuConfig="menuConfig"></header-menu>
    </el-col>
    <el-col :span="6">
      <div class="header-search">
        <el-input placeholder="搜索" v-model="searchText" suffix-icon="el-input__icon"></el-input>
      </div>
    </el-col>
    <el-col :span="2" :push="1">
      <div class="avatar-wrap">
        <el-dropdown @command="eventHandler" trigger="click">
          <a class="user-avatar"></a>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
  import { ACTIVE_MENU, SET_USER_MSG } from 'store/mutation-types';

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
        'activeMenu',
        'user'
      ])
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': ACTIVE_MENU,
        'setUserMsg': SET_USER_MSG
      }),
      handleSelect (key) {
        this.setActiveMenu(key);
      },
      eventHandler (event) {
        if (event === 'logout') {
          this.logout();
        }
      },
      logout () {
        if (this.user) {
          this.$http({
            url: '/logout',
            data: {
              id: this.user._id
            }
          }).then(() => {

            this.clearUserMsg();
            this.goToLoginPage();

          });
        }
      },
      clearUserMsg () {
        this.setUserMsg(null);
      },
      goToLoginPage () {
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../../assets/css/theme";
  .normal-header {
    height: 100%;
    color: #ffffff;
    /deep/ .el-menu {
      background: @pageHeaderBg;
    }

    /deep/ .el-menu--horizontal {
      border-bottom: none !important;
    }
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
