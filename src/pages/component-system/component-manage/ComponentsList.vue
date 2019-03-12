<template>
  <section class="home-page">
    <el-row type="flex" justify="center" class="mini-header">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <div class="operate-bar">
          <div class="btn-wrap">
            <el-button type="primary" @click="goToAddCollectionPage" size="mini">添加组件</el-button>
          </div>
        </div>
        <el-card class="component-list" ref="loadingTarget">
          <Empty v-if="favoriteList.length === 0">
            <el-button type="primary" @click="goToAddCollectionPage" size="mini">添加组件</el-button>
          </Empty>
          <template v-else>

            <ComponentItem
              v-for="(item, index) in favoriteList"
              :key="index"
              :data="item"
              @view="onView(item)"
              @delete="onDelete(item)"
              @edit="onEdit(item)"
            ></ComponentItem>
          </template>
        </el-card>
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
        favoriteList: []
      };
    },
    mounted () {
      this.getCollectionList();
    },
    methods: {
      /**
       * 获取收藏的链接列表
       */
      getCollectionList () {
        this.$http({
          url: '/components',
          hasWarning: true,
          loading: true,
          loadingTarget: this.$refs.loadingTarget.$el
        }).then(data => {
          this.favoriteList = data;
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
              this.getCollectionList();
              this.$alert.success('删除成功');
            });
          }
        });
      },
      goToAddCollectionPage () {
        this.$router.push('/component-system/CreateComponent/');
      }
    }
  };
</script>

<style scoped lang="less">
  .home-page {
    .operate-bar {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
  }
</style>
