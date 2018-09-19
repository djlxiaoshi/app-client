<template>
  <div id="app">
    <div class="app-header-warp">
      <app-header></app-header>
    </div>
    <div class="app-body-wrap" ref="body">
      <div>
        <router-view></router-view>
      </div>
    </div>
    <div class="app-footer-wrap">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/core/header/AppHeader';
  import AppFooter from './components/core/footer/AppFooter';
  import BScroll from 'better-scroll';
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
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.body, {});
      });
    },
    watch: {
      '$route' () {
        this.$nextTick(() => {
          // 重新计算容器内子元素的高度
          this.scroll.refresh();
        });
      }
    }
  };
</script>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    .app-header-warp {
      height: 40px;
      box-sizing: border-box;
    }
    .app-body-wrap {
      box-sizing: border-box;
      height: calc(100vh - 100px);
      overflow: auto;
    }
    .app-footer-wrap {
      height: 60px;
      box-sizing: border-box;
      border-top: 1px solid #dddddd;
    }
  }
</style>
