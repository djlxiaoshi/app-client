<template>
  <section class="home-page">
    <el-row type="flex" justify="center" class="mini-header">
      <el-col :xs="24" :sm="14" :md="14" :lg="13" :xl="14" class="card-left">
        <el-card>
          <link-item
            v-for="(item, index) in favoriteList"
            :data="item"
            :key="index"
            @delete="onBtnClick(index)"
            @edit="edit(item)"
          ></link-item>
        </el-card>
      </el-col>

      <el-col
        class="card-right app-card"
        :xs="0" :sm="4" :md="4"
        :lg="4" :xl="4"
        :offset="1">
        标签
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
        this.$router.push('/edit/' + item._id);
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
    .card-left, .card-right {
      background: #fff;
    }

    .card-right {

    }
    /deep/ .home-link-item {
      border-bottom: 1px solid #f0f0f0;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
</style>
