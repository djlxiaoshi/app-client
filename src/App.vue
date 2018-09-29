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
  </div>
</template>

<script>
  import AppHeader from './pages/core/header/AppHeader';
  import AppFooter from './pages/core/footer/AppFooter';

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter
    },
    data () {
      return {
      };
    },
    mounted () {

    }
  };
</script>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    .app-header-wrap {
      height: 60px;
      box-sizing: border-box;
      background: #545c64; // 主题
    }
    .app-body-wrap {

    }
    .app-footer-wrap {

    }
  }
</style>
