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

    <side-menu ref="sideMenu" v-if="sideMenuVisible"></side-menu>
  </div>
</template>

<script>
  import AppHeader from './pages/core/header/AppHeader';
  import AppFooter from './pages/core/footer/AppFooter';
  import SideMenu from './pages/core/side-menu/SideMenu';
  import { mapState } from 'vuex';

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter,
      SideMenu
    },
    data () {
      return {
      };
    },
    mounted () {

    },
    computed: {
      ...mapState([
        'sideMenuVisible'
      ])
    }
  };
</script>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    position: relative;
    .app-header-wrap {
      height: 60px;
      box-sizing: border-box;
      background: #545c64; // 主题
    }
    .app-body-wrap {
      max-width: 960px;
      margin: 0 auto;
    }
    .app-footer-wrap {

    }
  }
</style>
