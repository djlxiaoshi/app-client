<template>
    <div class="app-loading">
      <slot v-if="loading"></slot>
    </div>
</template>

<script>
    export default {
       props: {
         loading: {
           type: Boolean,
           default: false
         }
       },
      data () {
         return {

         };
      }
    };
</script>

<style scoped lang="less">
  .app-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>
