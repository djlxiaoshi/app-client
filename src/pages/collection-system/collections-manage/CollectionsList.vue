<template>
  <section class="home-page">
    <el-row type="flex" justify="center" class="mini-header">
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-card class="card-left" ref="loadingTarget">
          <CollectionItem
            v-for="(item, index) in favoriteList"
            :data="item"
            :key="index"
            @delete="onBtnClick(index)"
            @edit="edit(item)"
          ></CollectionItem>
        </el-card>
      </el-col>

      <el-col
        class="card-right app-card"
        :xs="0" :sm="5" :md="5" :lg="5" :xl="5"
        :offset="1" ref="tagsWrap">
        <div class="tags-wrap" >
          <div class="operate-btn-wrap">
            <div class="add-collection-btn">
              <el-button type="primary" @click="goTOAddCollectionPage" size="mini">添加收藏</el-button>
              <span class="btn-desc">记录真正对你有用的</span>
            </div>
            <div class="tag-manege-btn">
              <el-button type="info" @click="goToTagManagePage" size="mini">标签管理</el-button>
              <span class="btn-desc">管理你的分类吧</span>
            </div>
          </div>
          <el-tag
            v-for="tag in tagsList"
            :key="tag.label"
            @click.native="getCollectionsByTagId(tag._id)">
            {{ tag.label }}({{ tag.collections.length }})
          </el-tag>
        </div>
      </el-col>
    </el-row>

  </section>
</template>

<script>
  import CollectionItem from './CollectionItem';
  export default {
    components: {
      CollectionItem
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
      test () {
        debugger;
      },
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
        this.$router.push('/collections-system/UpdateCollection/' + item._id);
      },
      deleteItem (id) {
        return this.$http({
          url: '/collection/' + id,
          method: 'delete',
          hasWarning: true
        }).then(() => {
          this.getTagsList();
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
      },
      // 通过tagId获取对应的collections列表
      getCollectionsByTagId (tagId) {
        this.$router.push('Tag/' + tagId);
      },
      // 跳转到添加收藏面板
      goTOAddCollectionPage () {
        this.$router.push('/collections-system/CreateCollection/');
      },
      goToTagManagePage () {
        this.$router.push('/collections-system/TagsList/');
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
        .operate-btn-wrap {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
          .btn-desc {
            font-size: 12px;
            color: #e5e5e5;
          }
          button {
            display: inline-block;
          }
          .add-collection-btn, .tag-manege-btn {
            margin-bottom: 10px;
          }
        }
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
