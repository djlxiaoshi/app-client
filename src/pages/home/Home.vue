<template>
    <section class="home-page">
      <link-item></link-item>
      <link-item></link-item>
      <link-item></link-item>
      <link-item></link-item>
      <link-item></link-item>
      <link-item></link-item>
      <link-item></link-item>
    </section>
</template>

<script>
  import LinkItem from './link-item/LinkItem';
    export default {
      components: {
        LinkItem
      },
      mounted () {
        this.http({
          url: '/dvfdb',
          hasWarning: true
        });
      }
    };
</script>

<style scoped lang="less">
  .home-page {
    /deep/ .link-item {
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
</style>
