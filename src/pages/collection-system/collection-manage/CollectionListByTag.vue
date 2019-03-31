<template>
  <section class="collection-list-tag-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
        <div class="operate-bar">
          <h2>{{ $route.query.tagLabel }}</h2>
          <div class="btn-wrap">
            <el-button type="primary" @click="goToCreatePage" size="mini">添加收藏</el-button>
          </div>
        </div>
        <div class="collection-list" ref="loadingTarget">
          <!-- 空状态 -->
          <Empty v-if="collectionList.length === 0">
            <el-button type="primary" @click="goToCreatePage" size="mini">添加收藏</el-button>
          </Empty>
          <!-- 非空状态 -->
          <template v-else>
            <CollectionItem
              v-for="(item, index) in collectionList"
              :key="index"
              :data="item"
              @view="onView(item)"
              @delete="onDelete(item)"
              @edit="onEdit(item)"
            ></CollectionItem>
          </template>
        </div>

        <div class="pagination-wrap">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import CollectionItem from './CollectionItem';
  import routerNameConfig from '../../../router/config';

  export default {
    components: {
      CollectionItem
    },
    data () {
      return {
        collectionList: [],
        currentPage: 1,
        pageSize: 10,
        totalPages: 10
      };
    },
    mounted () {
      this.getCollectionListByTag();
    },
    methods: {
      /**
       * 获取收藏的链接列表
       */
      getCollectionListByTag () {
        const { xhrInstance } = this.$http({
          url: '/collections',
          showErrorMsg: true,
          loading: this.$refs.loadingTarget,
          data: {
            currentPage: parseInt(this.currentPage),
            pageSize: parseInt(this.pageSize),
            tagId: this.$route.query.tagId
          }
        });

        xhrInstance.then(data => {
          this.totalPages = data.total;
          this.collectionList = data.list;
        }, () => {
        });
      },
      onView (item) {
        this.$router.push({ name: routerNameConfig.ViewCollectionRouterName, params: { id: item._id } });
      },
      onEdit (item) {
        this.$router.push({ name: routerNameConfig.UpdateCollectionRouterName, params: { id: item._id } });
      },
      deleteItem (id) {
        return this.$http({
          url: '/collection/' + id,
          method: 'delete',
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      onDelete (item) {
        this.$alert.warning('确定要删除该项吗？').then((willDone) => {
          if (willDone) {
            const { xhrInstance } = this.deleteItem(item._id);

            xhrInstance.then(() => {
              this.getCollectionListByTag();
            });
          }
        });
      },
      goToCreatePage () {
        this.$router.push({ name: routerNameConfig.CreateCollectionRouterName, query: { defaultTag: this.$route.query.tagId } });
      },
      currentChange (currentPage) {
        this.currentPage = currentPage;
        this.getCollectionListByTag();
      }
    }
  };
</script>

<style scoped lang="less">
  .collection-list-tag-page {
    .main-container {
      background: #ffffff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .operate-bar {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px 10px;
      border-bottom: 1px solid #e5e5e5;
      background: #ffffff;
      .btn-wrap {
        margin-left: auto;
      }
    }
    .collection-list {
      background: #fff;
    }
    .empty-list {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      .empty-text {
        text-align: center;
      }
    }
    /deep/ .collection-item {
      border-bottom: 1px solid #f0f0f0;
      &:last-of-type {
        border-bottom: none;
      }
    }
    .pagination-wrap {
      padding: 10px 0;
      border-top: 1px solid #e5e5e5;
      text-align: center;
    }
  }
</style>
