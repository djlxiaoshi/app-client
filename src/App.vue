<template>
  <div id="app">
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
  @import "./assets/css/theme.less";
  #app {
    display: flex;
    flex-direction: column;
    position: relative;
    .app-header-wrap {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 1000;
      box-sizing: border-box;
      background: @pageHeaderBg; // 主题
    }
    .app-body-wrap {
      margin-top: 60px;
      padding-top: 20px;
      padding-bottom: 40px;
      background: @pageBodyBg;
      min-height: calc(100vh - 100px);
    }
    .app-footer-wrap {

    }
  }
</style>
