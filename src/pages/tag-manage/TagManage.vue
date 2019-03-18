<template>
    <div class="tag-manage-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
          <div class="operate-bar">
            <div class="btn-wrap">
              <el-button type="primary" @click="openCreateTagDialog" size="mini">添加分类</el-button>
            </div>
          </div>

          <div class="tag-list" ref="loadingTarget">
              <!-- 空状态 -->
              <Empty v-if="tagsList.length === 0">
                <el-button type="primary" @click="openCreateTagDialog" size="mini">添加分类</el-button>
              </Empty>
              <!-- 非空状态 -->
              <template v-else>
                <TagItem
                  v-for="(tag, index) in tagsList"
                  :key="index"
                  :data="tag"
                  @view="viewDetails"
                  @edit="openUpdateTagDialog"
                  @delete="openDeleteTagDialog"
                >
                </TagItem>
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
    </div>
</template>

<script>
  import TagItem from './TagItem';
  import dayjs from 'dayjs';
  import routerNameConfig from '../../router/config';

  export default {
    name: '',
    components: {
      TagItem
    },
    data () {
      return {
        tagsList: [],
        currentPage: 1,
        pageSize: 10,
        totalPages: 10
      };
    },
    mounted () {
      this.getTagsList();
    },
    methods: {
      // 获取所有类别列表
      getTagsList () {
        const { xhrInstance } = this.$http({
          url: '/tags',
          showErrorMsg: true,
          loading: this.$refs.loadingTarget,
          data: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        });

        xhrInstance.then(data => {
          this.totalPages = data.total;
          this.tagsList = data.list;
        }, () => {
        });
      },
      viewDetails (tag) {
        this.$router.push({ name: routerNameConfig.ComponentListByTagRouterName, query: { tagId: tag._id, tagLabel: tag.label } });
      },
      openUpdateTagDialog (tag) {
        this.$alert.input({
          title: '编辑类别',
          defaultValue: tag.label
        }).then(inputValue => {
          if (inputValue && (inputValue.trim() !== '')) {
            const { xhrInstance } = this.updateTag(tag._id, inputValue.trim());

            xhrInstance.then(() => {
              this.getTagsList();
            });
          }
        });
      },
      openDeleteTagDialog (tag) {
        this.$alert.warning('确定要删除该项吗？').then((willDone) => {
          if (willDone) {
            const { xhrInstance } = this.deleteTag(tag);

            xhrInstance.then(() => {
              this.getTagsList();
            });
          }
        });
      },
      // 删除标签
      deleteTag (tag) {
        return this.$http({
          url: '/tag/' + tag._id,
          method: 'delete',
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      // 编辑类别
      updateTag (id, label) {
        return this.$http({
          url: '/tag/' + id,
          method: 'put',
          data: { label: label },
          showErrorMsg: true,
          showSuccessMsg: true
        });
      },
      openCreateTagDialog () {
        this.$alert.input({
          title: '新增类别',
          text: '请输入类别名称'
        }).then(inputValue => {
          if (inputValue && (inputValue.trim() !== '')) {
            const { xhrInstance } = this.createTag(inputValue.trim());

            xhrInstance.then(() => {
              this.getTagsList();
            }).catch(() => {});
          }
        });
      },
      createTag (label) {
        return this.$http({
          url: '/tag/',
          method: 'post',
          data: { label: label, createTime: dayjs().format('YYYY-MM-DD HH:MM:ss') },
          hasWarning: true
        });
      },
      currentChange (currentPage) {
        this.currentPage = currentPage;
        this.getTagsList();
      }
    }
  };
</script>

<style scoped lang="less">
  .tag-manage-page {

    /deep/ .tag-item {
      border-bottom: 1px solid #e5e5e5;
      &:last-of-type {
        border-bottom: none;
      }
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

    .tag-list {
      display: flex;
      flex-wrap: wrap;
    }

    .pagination-wrap {
      padding: 10px 0;
      border-top: 1px solid #e5e5e5;
      text-align: center;
    }
  }
</style>
