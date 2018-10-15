<template>
  <section class="home-page">
    <link-item
      v-for="(item, index) in favoriteList"
      :data="item"
      :key="index"
      @delete="onBtnClick(index)"></link-item>
  </section>
</template>

<script>
  import LinkItem from './LinkItem';
  export default {
    components: {
      LinkItem
    },
    data () {
      return {
        favoriteList: []
      };
    },
    created () {
      this.getData();
    },
    mounted () {

    },
    watch: {},
    methods: {

      /**
       * 获取收藏的链接列表
       */
      getData () {
        this.$http({
          url: '/collection',
          hasWarning: true
        }).then(data => {
          this.favoriteList = data;
        }, () => {});
      },
      deleteItem (id) {
        this.$http({
          url: '/collection/' + id,
          method: 'delete',
          hasWarning: true
        }).then(() => {
          this.getData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      back () {
        this.showSwipePage = false;
      },
      onItemClick (item, index) {
        window.location.href = item.url;
      },
      onBtnClick (index) {
        this.$confirm('确定要删除该收藏吗？', '警告', {
          type: 'warning'
        }).then(() => {
          this.deleteItem(this.favoriteList[index]._id);
        }).catch(() => {

        });
      }
    }
  };
</script>

<style scoped lang="less">
  .home-page {

    /deep/ .home-link-item {
      border-bottom: 1px solid #f0f0f0;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
</style>
