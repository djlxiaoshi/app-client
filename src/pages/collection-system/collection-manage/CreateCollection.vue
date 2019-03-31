<template>
  <div class="create-collection-page">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
            <el-card class="box-card">
              <div slot="header" class="card-header">
                添加收藏
              </div>
              <div class="card-body">
                <el-form
                  ref="form"
                  :rules="rules"
                  :model="data"
                  label-width="150px"
                  label-position="left">

                  <el-form-item label="收藏名称" prop="name">
                    <el-input v-model="data.name"></el-input>
                  </el-form-item>

                  <el-form-item label="收藏描述" prop="desc">
                    <el-input v-model="data.desc"></el-input>
                  </el-form-item>

                  <el-form-item label="组件类别" prop="tag">
                    <el-radio-group v-model="data.tag">
                      <el-radio :label="tag._id" v-for="(tag, index) in tagsList" :key="index">
                        {{ tag.label }}
                      </el-radio>
                    </el-radio-group>
                    <div>
                      <el-button type="primary" size="mini" plain @click="openCreateTagDialog">增加类别</el-button>
                    </div>
                  </el-form-item>

                  <el-form-item label="收藏地址" prop="url">
                    <el-input v-model="data.url"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="formValidate" class="create-btn">
                      立即创建
                    </el-button>
                  </el-form-item>

                </el-form>
              </div>
              <div class="card-footer"></div>
            </el-card>
          </el-col>
        </el-row>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import routerNameConfig from '../../../router/config';

  export default {
    data () {
      const checkUrl = (rule, value, callback) => {
        if (!(/^(http|https):\/\//.test(value))) {
          callback(new Error('请输入正确的URL地址'));
        } else {
          callback();
        }
      };

      return {
        data: {
          name: '',
          desc: '',
          url: '',
          tag: '',
          createTime: ''
        },
        tagsList: [],
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '收藏名称不能为空' }
          ],
          desc: [
            { required: true, trigger: 'blur', message: '收藏描述不能为空' }
          ],
          url: [
            { required: true, trigger: 'blur', message: '收藏地址不能为空' },
            { trigger: 'blur', validator: checkUrl }
          ],
          tag: [
            { required: true, trigger: 'blur', message: '请选择收藏类别' }
          ]
        }
      };
    },
    mounted () {
      // 默认选中tag
      this.setDefaultTag();
      this.getAllTags();
    },
    methods: {

      setDefaultTag () {
        if (this.$route.query && this.$route.query.defaultTag) {
          this.data.tag = this.$route.query.defaultTag;
        }
      },
      // 获取所有标签列表
      getAllTags () {
        const { xhrInstance } = this.$http({
          url: '/tags',
          showErrorMsg: true
        });

        xhrInstance.then((res) => {
          this.tagsList = res;
        });
      },
      // 跳转组件详细介绍页面
      goToDetailsPage (collection) {
        this.$router.push({ name: routerNameConfig.ViewCollectionRouterName, params: { id: collection._id } });
      },
      openCreateTagDialog () {
        this.$alert.input({
          title: '新增类别',
          text: '请输入类别名称'
        }).then(inputValue => {
          if (inputValue && (inputValue.trim() !== '')) {
            const { xhrInstance } = this.createTag(inputValue.trim());

            xhrInstance.then(() => {
              this.getAllTags();
            });
          }
        });
      },
      createTag (label) {
        return this.$http({
          url: '/tag/',
          method: 'post',
          data: { label: label, createTime: dayjs().format('YYYY-MM-DD HH:MM:ss') },
          showErrorMsg: true,
          showSuccessMsg: true,
        });
      },
      createCollection () {
        const { xhrInstance } = this.$http({
          url: '/collection',
          method: 'post',
          showErrorMsg: true,
          showSuccessMsg: true,
          data: { ...this.data, createTime: dayjs().format('YYYY-MM-DD HH:MM:ss') }
        });

        xhrInstance.then((res) => {
          this.goToDetailsPage(res);
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.createCollection();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .create-collection-page {
    .box-card {
      .create-btn {
        width: 100%;
      }
      /deep/ .el-textarea {
        textarea {
          font-family: '微软雅黑';
        }
      }
    }
  }
</style>
