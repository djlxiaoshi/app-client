<template>
  <el-row type="flex" align="middle" justify="center" class="normal-header">
    <el-col :span="20">
      <div class="header-container">
        <div class="header-left">
          <el-menu
            :default-active="activeSystem"
            class="system-menu"
            mode="horizontal"
            @select="handleSystemSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#5a92fd">
            <el-submenu index="2">
              <template slot="title">{{ selectSystem.label }}</template>
              <el-menu-item
                :disabled="getSystemMenuItemStatus(item)"
                :index="item['name']"
                v-for="item in menuList"
                :key="item['name']">
                {{ item['label'] }}
              </el-menu-item>
            </el-submenu>
          </el-menu>

          <header-menu
            text-color="#fff"
            background-color="#545c64"
            active-text-color="#ffd04b"
            :activeMenu="activeMenu"
            mode="horizontal"
            :menuConfig="selectSystem.menus"></header-menu>
        </div>

        <div class="header-right">
          <div class="avatar-wrap" v-if="user">
            <el-dropdown @command="eventHandler" trigger="click">
              <a class="user-avatar">
                <img :src="$globalConfig.SERVER_ADDRESS + user.avatar" width="100%">
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
  import { mapState, mapMutations } from 'vuex';
  import { ACTIVE_MENU, SET_USER_MSG } from 'store/mutation-types';

  export default {
    components: {
      HeaderMenu
    },
    data () {
      return {
        selectSystem: {}
      };
    },
    computed: {
      ...mapState([
        'activeMenu',
        'user',
        'menuList',
        'activeSystem'
      ])
    },
    mounted () {
      this.setDefaultSystem();
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': ACTIVE_MENU,
        'setUserMsg': SET_USER_MSG
      }),
      // 根据路径设置默认选择系统
      setDefaultSystem () {
        const flag = this.menuList.some(system => {
          if (system.name === this.activeSystem) {
            this.selectSystem = system;
          }
        });
        // 当浏览器中输入的路径，该用户没有权限时为false
        if (!flag) {
        }
      },
      getSystemMenuItemStatus (system) {
        return !system.menus.length;
      },
      handleSystemSelect (systemName) {
        this.menuList.forEach(systemItem => {
          if (systemItem.name === systemName) {
            this.selectSystem = systemItem;
            const menuList = this.selectSystem.menus;
            if (menuList && menuList.length) {
              this.$router.push(menuList[0].path);
            } else {
              console.log(404);
              this.$router.push();
              // todo 404
            }
          }
        });
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
          const { xhrInstance } = this.$http({
            url: '/logout',
            data: {
              id: this.user._id
            }
          });

          xhrInstance.then(() => {

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
      },
      goToRegisterPage () {
        this.$router.push('/register');
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
      .header-left {
        display: flex;
        .system-menu {
          /deep/ .is-active {
            .el-submenu__title {
              border-bottom: none !important;
              color: #5a92fd !important;
              font-size: 16px !important;
              font-weight: 600 !important;
            }
          }
        }
      }
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
