<template>
  <header class="app-header">
    <el-row type="flex" align="middle" justify="center">
      <el-col  :span="18">
        <mini-header v-if="isMiniWidth"></mini-header>
        <normal-header v-else></normal-header>
      </el-col>
    </el-row>
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
  @import "../../../assets/css/theme";
  .app-header {
    height: 100%;
    background: @pageHeaderBg;
    /deep/ .el-row {
      height: 100%;
    }
  }
</style>
