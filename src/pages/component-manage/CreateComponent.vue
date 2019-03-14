<template>
  <div class="create-component-page">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
            <el-card class="box-card">
              <div slot="header" class="card-header">
                添加组件
              </div>
              <div class="card-body">
                <el-form
                  ref="form"
                  :rules="rules"
                  :model="data"
                  label-width="150px"
                  label-position="left">

                  <el-form-item label="组件中文名称" prop="chineseName">
                    <el-input v-model="data.chineseName"></el-input>
                  </el-form-item>

                  <el-form-item label="组件英文名称" prop="englishName">
                    <el-input v-model="data.englishName"></el-input>
                  </el-form-item>

                  <el-form-item label="安装依赖说明" prop="dependencies">
                    <el-input
                      v-model="data.dependencies"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容">
                    </el-input>
                  </el-form-item>

                  <el-form-item label="组件类别" prop="gitlab">
                    <el-radio-group v-model="data.tag">
                      <el-radio :label="tag._id" v-for="(tag, index) in tagsList" :key="index">
                        {{ tag.label }}
                      </el-radio>
                    </el-radio-group>
                    <div>
                      <el-button type="primary" size="mini" plain @click="openCreateTagDialog">增加类别</el-button>
                    </div>
                  </el-form-item>

                  <el-form-item label="Gitlab地址" prop="gitlab">
                    <el-input v-model="data.gitlab"></el-input>
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
          chineseName: '',
          englishName: '',
          dependencies: '',
          gitlab: '',
          tag: ''
        },
        tagsList: [],
        rules: {
          chineseName: [
            { required: true, trigger: 'blur', message: '组件中文名不能为空' }
          ],
          englishName: [
            { required: true, trigger: 'blur', message: '组件英文名不能为空' }
          ],
          dependencies: [
            { required: true, trigger: 'blur', message: '安装依赖说明不能为空' }
          ],
          gitlab: [
            { required: true, trigger: 'blur', message: 'Gitlab地址不能为空' },
            { trigger: 'blur', validator: checkUrl }
          ]
        }
      };
    },
    mounted () {
      // 默认选中tag
      if (this.$route.query && this.$route.query.defaultTag) {
        this.data.tag = this.$route.query.defaultTag;
      }
      this.getAllTags();
    },
    methods: {

      // 获取所有标签列表
      getAllTags () {
        this.$http({
          url: '/tags',
          hasWarning: true
        }).then((res) => {
          this.tagsList = res;
        });
      },
      // 跳转组件详细介绍页面
      goToComponentDetailsPage (component) {
        this.$router.push('/component/ViewComponent/' + component._id);
      },
      openCreateTagDialog () {
        this.$alert.input({
          title: '新增类别',
          text: '请输入类别名称'
        }).then(inputValue => {
          if (inputValue && (inputValue.trim() !== '')) {
            this.createTag(inputValue.trim()).then(() => {
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
          hasWarning: true
        });
      },
      createComponent () {
        this.$http({
          url: '/component',
          method: 'post',
          hasWarning: true,
          showSuccessMsg: true,
          data: this.data
        }).then((res) => {
          this.goToComponentDetailsPage(res);
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.createComponent();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .create-component-page {
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
