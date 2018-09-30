<template>
  <transition name="page-move">
    <el-menu
      :default-active="activeIndex"
      class="side-menu"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">我的书签</el-menu-item>
      <el-menu-item index="2">热门收藏</el-menu-item>
    </el-menu>
  </transition>
</template>

<script>
    export default {
      name: 'side-menu',
      data () {
        return {
          activeIndex: '1'
        };
      },
      methods: {
        handleSelect () {}
      }
    };
</script>

<style scoped lang="less">
  .page-move-enter, .page-move-leave-active {
    transform: translate( 0, 100%)
  }
  .page-move-enter-active, .page-move-leave-active {
    transition: transform .3s
  }

  .side-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
