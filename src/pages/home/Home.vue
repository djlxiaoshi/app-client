<template>
  <section class="home-page">
    <el-row type="flex" justify="center" class="mini-header">
      <el-col :span="18">
        <link-item
          v-for="(item, index) in favoriteList"
          :data="item"
          :key="index"
          @delete="onBtnClick(index)"
          @edit="edit(item)"
        ></link-item>
      </el-col>
    </el-row>

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
      edit (item) {

      },
      deleteItem (id) {
        return this.$http({
          url: '/collection/' + id,
          method: 'delete',
          hasWarning: true
        });
      },
      back () {
        this.showSwipePage = false;
      },
      onItemClick (item, index) {
        window.location.href = item.url;
      },
      onBtnClick (index) {
        this.$alert.warning('确定要删除该收藏吗？').then((willDone) => {
          if (willDone) {
            this.deleteItem(this.favoriteList[index]._id).then(() => {
              this.getData();
              this.$alert.success('删除成功');
            });
          }
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
