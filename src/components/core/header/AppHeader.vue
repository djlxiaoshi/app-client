<template>
  <header class="app-header">
    <mini-header v-if="isMiniWidth"></mini-header>
    <normal-header v-else></normal-header>
  </header>

</template>

<script>
  import MiniHeader from './MiniHeader';
  import NormalHeader from './NormalHeader';

  import { mapState } from 'vuex';

  export default {
    components: {
      MiniHeader,
      NormalHeader
    },
    data () {
      return {};
    },
    computed: {
      ...mapState([
        'isMiniWidth'
      ])
    }
  };
</script>

<style scoped lang="less">
  .app-header {
    height: 100%;
    max-width: 960px;
    margin: 0 auto;
    /deep/ .el-col {
      padding: 0 20px;
    }
  }
</style>
