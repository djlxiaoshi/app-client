<template>
  <div id="app">
    <div class="app-body-wrap">
        <router-view></router-view>
    </div>
    <div class="app-footer-wrap">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/core/header/AppHeader';
  import AppFooter from './components/core/footer/AppFooter';

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter
    },
    data () {
      return {
        scroll
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
    .app-body-wrap {
      box-sizing: border-box;
      height: calc(100vh - 60px);
    }
    .app-footer-wrap {
      height: 60px;
      box-sizing: border-box;
      border-top: 1px solid #dddddd;
    }
  }
</style>
