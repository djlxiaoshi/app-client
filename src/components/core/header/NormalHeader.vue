<template>
  <el-row type="flex" align="middle" justify="center" class="normal-header">
    <el-col :span="20">
      <div class="header-container">
        <div class="header-left">
          <el-menu
            :default-active="defaultSelectSystem"
            class="system-menu"
            mode="horizontal"
            @select="handleSystemSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#5a92fd">
            <el-submenu index="2">
              <template slot="title">{{ selectSystem }}</template>
              <el-menu-item
                :index="item['system']"
                v-for="(item, index) in systemConfig"
                :key="index">
                {{ item['label'] }}
              </el-menu-item>
            </el-submenu>
          </el-menu>

          <header-menu
            text-color="#fff"
            background-color="#545c64"
            active-text-color="#ffd04b"
            mode="horizontal"
            :menuConfig="menuList"></header-menu>
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
  import { ACTIVE_MENU, SET_USER_MSG, SET_MENU_LIST } from 'store/mutation-types';

  export default {
    components: {
      HeaderMenu
    },
    data () {
      return {
        searchText: '',
        selectSystem: '我的收藏',
        systemConfig: [
          { system: 'collection', label: '我的收藏' },
          { system: 'blog', label: '我的博客' }
        ]
      };
    },
    computed: {
      ...mapState([
        'activeMenu',
        'user',
        'menuList'
      ]),
      defaultSelectSystem () {
        return this.systemConfig[0].system;
      }
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': ACTIVE_MENU,
        'setUserMsg': SET_USER_MSG,
        'setMenuList': SET_MENU_LIST
      }),
      handleSelect (key) {
        this.setActiveMenu(key);
      },
      handleSystemSelect (systemName) {
        this.systemConfig.forEach(menuItem => {
          if (menuItem.system === systemName) {
            this.selectSystem = menuItem.label;
          }
        });

        this.getMenuListBySystemName(systemName).then((menuList) => {
          if (menuList.length) {
            this.$router.push(menuList[0].path);
          } else {
          //  暂无内容页面
          }

        });
      },
      getMenuListBySystemName (systemName) {
        return this.$http({
          url: '/menus',
          data: {
            system: systemName
          }
        }).then(menuList => {
          this.setMenuList(menuList);
          return menuList;
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
