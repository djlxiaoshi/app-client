<template>
  <el-row type="flex" align="middle" justify="center" class="normal-header">
    <el-col :span="20">
      <div class="header-container">
        <div class="header-left">
          <header-menu
            text-color="#fff"
            background-color="#545c64"
            active-text-color="#ffd04b"
            mode="horizontal"
            :menuConfig="menuConfig"></header-menu>
        </div>

        <div class="header-right">
          <div class="avatar-wrap" v-if="user">
            <el-dropdown @command="eventHandler" trigger="click">
              <a class="user-avatar">
                <img :src="user.avatar" width="100%">
              </a>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="login-or-register" v-else>
            <a class="login-btn" href="javascript:void(0)" @click="goToLoginPage">登录</a>
            <a class="register-btn" href="javascript:void(0)" @click="goToRegisterPage">注册</a>
          </div>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script>
  import HeaderMenu from 'components/core/menu/Menu';
  import {routes as menuConfig} from 'router/index';
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
        } else if (event === 'userInfo') {
          this.$router.push('/user/info');
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
        this.$router.push('/user/login');
      },
      goToRegisterPage () {
        this.$router.push('/user/register');
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
      text-align: right;
      cursor: pointer;
    }
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .avatar-wrap {
      .user-avatar {
        display: inline-block;
        overflow: hidden;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #e5e5e5;
        cursor: pointer;
      }
    }
    .login-or-register {
      .register-btn, .login-btn {
        color: #ffffff;
        padding: 0 5px 5px 5px;
        &:hover {
          color: rgb(255, 208, 75);
        }
      }
    }
  }
</style>
