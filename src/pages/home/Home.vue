<template>
  <section class="home-page">
    <el-row type="flex" justify="center" class="mini-header">
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-card class="card-left" ref="loadingTarget">
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
        :xs="0" :sm="5" :md="5" :lg="5" :xl="5"
        :offset="1" ref="tagsWrap">
        <div class="tags-wrap" >
          <el-tag v-for="tag in tagsList" :key="tag.label">{{ tag.label }}({{ tag.count }})</el-tag>
        </div>
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
        favoriteList: [],
        tagsList: []
      };
    },
    mounted () {

      this.getCollectionList();

      this.getTagsList();
    },
    watch: {},
    methods: {

      /**
       * 获取收藏的链接列表
       */
      getCollectionList () {
        this.$http({
          url: '/collection',
          hasWarning: true,
          loading: true,
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(data => {
          this.favoriteList = data;
        }, () => {
        });
      },
      getTagsList () {
        this.$http({
          url: '/tags',
          hasWarning: true,
          loading: true,
          loadingTarget: this.$refs.tagsWrap.$el
        }).then(data => {
          this.tagsList = data;
        }, () => {
        });
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
      onBtnClick (index) {
        this.$alert.warning('确定要删除该收藏吗？').then((willDone) => {
          if (willDone) {
            this.deleteItem(this.favoriteList[index]._id).then(() => {
              this.getCollectionList();
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
      /deep/ .el-tag {
        margin: 5px;
        cursor: pointer;
      }
      .tags-wrap {
        height: 100%;
      }
    }

    .card-left {
      min-height: 120px;
      padding: 0 !important;
    }
    /deep/ .home-link-item {
      border-bottom: 1px solid #f0f0f0;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
</style>
