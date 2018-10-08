<template>
  <section class="home-page">
    <link-item
      v-for="(item, index) in favoriteList"
      :data="item"
      :key="index"
      @delete="deleteItem"></link-item>
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
          url: '/favorite',
          hasWarning: true
        }).then(data => {
          this.favoriteList = data;
        });
      },
      deleteItem (id) {
        this.$confirm('确定要删除该收藏吗？', '警告', {
          type: 'warning'
        }).then(() => {
          this.$http({
            url: '/favorite/' + id,
            method: 'delete',
            hasWarning: true
          }).then(() => {
            this.getData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {

        });

      },
      back () {
        this.showSwipePage = false;
      },
      onItemClick (item, index) {
        window.location.href = item.url;
      },
      onBtnClick (btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.deleteItem(this.favoriteList[index].id);
            }
          }).show();
        } else {
          this.$refs.swipeItem[index].shrink();
        }
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
