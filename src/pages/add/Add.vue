<template>
  <div class="add-page">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="12" :md="12" :lg="13" :xl="14">
            <el-card class="box-card">
              <div slot="header" class="card-header">
                添加收藏
              </div>
              <div class="card-body">
                <el-form
                  ref="form"
                  :rules="rules"
                  :model="data"
                  label-width="80px"
                  label-position="left">
                  <el-form-item label="链接地址" prop="url">
                    <el-input v-model="data.url"></el-input>
                  </el-form-item>

                  <el-form-item label="标题" prop="title">
                    <el-input v-model="data.title"></el-input>
                  </el-form-item>

                  <el-form-item label="分类">
                    <input-tag :tags.sync="data.tags"></input-tag>
                  </el-form-item>

                  <el-form-item label="概括" prop="abstract">
                    <el-input v-model="data.abstract"></el-input>
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

          <el-col
            class="app-card"
            :xs="0" :sm="6" :md="6" :lg="4"
            :xl="4" :offset="1"
          >
            待续
          </el-col>
        </el-row>

  </div>
</template>

<script>
  import dayjs from 'dayjs';
  export default {
    data () {
      const checkUrl = (rule, value, callback) => {
        if (value === '' || value.trim() === '') {
          callback(new Error('url地址不能为空'));
        } else if (!(/^(http|https):\/\//.test(value))) {
          callback(new Error('请输入正确的url地址'));
        } else {
          callback();
        }
      };

      const checkAbstract = (rule, value, callback) => {
        if (value === '' || value.trim() === '') {
          callback(new Error('概述不能为空'));
        } else {
          callback();
        }
      };

      const checkTitle = (rule, value, callback) => {
        if (value === '' || value.trim() === '') {
          callback(new Error('标题不能为空'));
        } else {
          callback();
        }
      };

      return {
        data: {
          url: '',
          title: '',
          tags: [],
          abstract: ''
        },
        rules: {
          url: [
            { required: true, trigger: 'blur', validator: checkUrl }
          ],
          title: [
            { required: true, trigger: 'blur', validator: checkTitle }
          ],
          abstract: [
            { required: true, trigger: 'blur', validator: checkAbstract }
          ]
        }
      };
    },
    mounted () {
    },
    methods: {
      add () {
        const data = {
          time: dayjs().format('YYYY-MM-DD HH:MM:ss')
        };
        Object.assign(data, this.data);

        this.$http({
          url: '/collection',
          method: 'post',
          hasWarning: true,
          showSuccessMsg: true,
          data: data,
          loading: true,
          loadingTarget: this.$refs.form.$el
        }).then(() => {

        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.add();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .add-page {
    .box-card {
      .create-btn {
        width: 100%;
      }
    }
    /deep/ .vue-input-tag-wrapper {
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      height: 40px;
      line-height: 1.5;
      border: 1px solid #dcdfe6;
      border-radius: 4px;

      &:hover {
        border-color: #c0c4cc;
      }
    }
  }
</style>
