<template>
  <transition name="page-move">
    <cube-page title="添加" v-on="$listeners">
      <div slot="content">
        辅导班国防部
      </div>
    </cube-page>
  </transition>
</template>

<script>
  import CubePage from '@/components/common/swipe-page/SwipePage';
    export default {
      name: 'swipe-page',
      components: {
        CubePage
      },
      methods: {
        back () {

        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .page-move-enter, .page-move-leave-active
    transform: translate(100%, 0)
  .page-move-enter-active, .page-move-leave-active
    transition: transform .3s
</style>
