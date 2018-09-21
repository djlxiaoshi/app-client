<template>
  <div class="swipe-page-cmpt">
    <header class="page-header">
      <h1 class="swipe-title">{{title}}</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="page-body">
        <slot name="content"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      }
    },
    methods: {
      back () {
         this.$emit('swipe-back');
      }
    }
  };
</script>

<style lang="less" scoped>
  .swipe-page-cmpt {
    position: absolute;
    z-index: 10001;
    top: 0;
    bottom: -60px;
    left: 0;
    right: 0;
    background: #fff;
    .page-header {
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      box-shadow: 0 1px 6px #ccc;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 5;
      .swipe-title {
        font-size: 16px;
        font-weight: 700;
      }
      .cubeic-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
        color: #fc9153;
      }
    }
    > .page-body {
      height: calc(100vh - 40px);
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
