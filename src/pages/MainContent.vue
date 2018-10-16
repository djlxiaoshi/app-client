<template>
    <div class="app-main">
      <div class="app-header-wrap">
        <app-header></app-header>
      </div>
      <div class="app-body-wrap">
        <router-view></router-view>
      </div>
      <div class="app-footer-wrap">

      </div>

      <side-bar v-if="sideMenuVisible"></side-bar>
    </div>
</template>

<script>
  import AppHeader from 'components/core/header/AppHeader';
  import AppFooter from 'components/core/footer/AppFooter';
  import SideBar from 'components/core/side-bar/SideBar';
  import { mapState } from 'vuex';

    export default {
      components: {
        AppHeader,
        AppFooter,
        SideBar
      },
      computed: {
        ...mapState([
          'sideMenuVisible'
        ])
      }

    };
</script>

<style scoped lang="less">
  .app-main {
    display: flex;
    flex-direction: column;
    position: relative;
    .app-header-wrap {
      position: fixed;
      left: 0;
      right: 0;
      height: 60px;
      box-sizing: border-box;
      background: #545c64; // 主题
    }
    .app-body-wrap {
      width: 80%;
      max-width: 960px;
      margin: 60px  auto 0 auto;
    }
    .app-footer-wrap {

    }
  }
</style>
