<template>
  <section class="home-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
        <div class="operate-bar">
          <div class="btn-wrap">
            <el-button type="primary" @click="goToAddCollectionPage" size="mini">添加组件</el-button>
          </div>
        </div>
        <div class="component-list" ref="loadingTarget">
          <!-- 空状态 -->
          <Empty v-if="componentsList.length === 0">
            <el-button type="primary" @click="goToAddCollectionPage" size="mini">添加组件</el-button>
          </Empty>
          <!-- 非空状态 -->
          <template v-else>
            <ComponentItem
              v-for="(item, index) in componentsList"
              :key="index"
              :data="item"
              @view="onView(item)"
              @delete="onDelete(item)"
              @edit="onEdit(item)"
            ></ComponentItem>
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
  import ComponentItem from './ComponentItem';
  import Empty from 'components/common/empty/Empty';
  export default {
    components: {
      ComponentItem,
      Empty
    },
    data () {
      return {
        componentsList: [],
        currentPage: 1,
        pageSize: 1,
        totalPages: 10
      };
    },
    mounted () {
      this.getComponentsList();
    },
    methods: {
      /**
       * 获取收藏的链接列表
       */
      getComponentsList () {
        this.$http({
          url: '/components',
          hasWarning: true,
          loading: true,
          data: {
            currentPage: parseInt(this.currentPage),
            pageSize: parseInt(this.pageSize)
          },
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(data => {
          this.totalPages = data.total;
          this.componentsList = data.list;
        }, () => {
        });
      },
      onView (item) {
        this.$router.push('/component-system/ViewComponent/' + item._id);
      },
      onEdit (item) {
        this.$router.push('/component-system/UpdateComponent/' + item._id);
      },
      deleteItem (id) {
        return this.$http({
          url: '/component/' + id,
          method: 'delete',
          hasWarning: true
        });
      },
      onDelete (item) {
        this.$alert.warning('确定要删除该项吗？').then((willDone) => {
          if (willDone) {
            this.deleteItem(item._id).then(() => {
              this.getComponentsList();
              this.$alert.success('删除成功');
            });
          }
        });
      },
      goToAddCollectionPage () {
        this.$router.push('/component-system/CreateComponent/');
      },
      currentChange (currentPage) {
        this.currentPage = currentPage;
        this.getComponentsList();
      }
    }
  };
</script>

<style scoped lang="less">
  .home-page {
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
    .component-list {
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
    /deep/ .component-item {
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
