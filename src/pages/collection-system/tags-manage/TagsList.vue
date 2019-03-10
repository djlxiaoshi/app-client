<template>
    <div class="tags-manage-page">
      <el-row type="flex" justify="center" class="main-content">
        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
          <el-card class="tags-panel">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" v-for="(tag, index) in tagList" :key="index">
              <TagItem :tag-data="tag"></TagItem>
            </el-col>
          </el-card>
        </el-col>

        <el-col
          class="app-card right-part"
          :xs="0" :sm="5" :md="5" :lg="5"
          :xl="5" :offset="1"
        >
          <div class="operate-btn-wrap">
            <el-button type="primary" @click="addTag">添加分类</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import TagItem from './TagItem';
  import dayjs from 'dayjs';

  export default {
    name: '',
    components: {
      TagItem
    },
    data () {
      return {
        tagList: []
      };
    },
    created () {
      this.getTagsList();
    },
    methods: {
      // 获取标签列表
      getTagsList () {
        this.$http({
          url: '/tags',
          method: 'get',
          hasWarning: true
        }).then(data => {
          this.tagList = data;
        }, () => {});
      },
      // 增加一个标签
      addTag () {
        this.$alert.input({
          title: '新建标签',
          text: '请输入标签名'
        }).then(inputValue => {
          if (inputValue && (inputValue.trim() !== '')) {
            this.$http({
              url: '/tags',
              method: 'post',
              data: {
                label: inputValue.trim(),
                createTime: dayjs().format('YYYY-MM-DD HH:MM:ss')
              },
              hasWarning: true,
              showSuccessMsg: true
            }).then(data => {
                this.getTagsList();
            }, () => {});
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .tags-manage-page {
    .tags-panel {
      padding-bottom: 50px;
    }
    .right-part {
      .operate-btn-wrap {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
</style>
