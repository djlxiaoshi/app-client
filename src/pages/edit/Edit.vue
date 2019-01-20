<template>
  <div class="edit-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="12" :md="12" :lg="13" :xl="14">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            编辑收藏
          </div>
          <div class="card-body">
            <el-form
              :rules="rules"
              ref="form"
              :model="formData"
              label-width="80px"
              label-position="left">
              <el-form-item label="链接地址" prop="url">
                <el-input v-model="formData.url"></el-input>
              </el-form-item>

              <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>

              <el-form-item label="分类">
                <el-checkbox-group v-model="formData.tags">
                  <el-checkbox :label="tag" v-for="(tag, index) in allTagsList" :key="index" @change="change(tag, $event)"></el-checkbox>
                </el-checkbox-group>
                <el-button type="text" @click="addTag">添加分类</el-button>
              </el-form-item>

              <el-form-item label="概括" prop="abstract">
                <el-input v-model="formData.abstract"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="formValidate" class="create-btn">
                  保存修改
                </el-button>
              </el-form-item>

            </el-form>
          </div>
          <div class="card-footer"></div>
        </el-card>
      </el-col>

      <el-col
        class="app-card"
        :xs="0" :sm="6" :md="6"
        :lg="4" :xl="4" :offset="1">
        待续
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import { mapState, mapMutations } from 'vuex';
  import { ACTIVE_MENU } from 'store/mutation-types';

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
        formData: {
          url: '',
          title: '',
          tags: [],
          abstract: ''
        },
        allTagsList: [],
        rules: {
          url: [
            { required: true, trigger: 'blur', message: 'URL地址不能为空' },
            { trigger: 'blur', validator: checkUrl }
          ],
          title: [
            { required: true, trigger: 'blur', message: '标题不能为空' }
          ],
          abstract: [
            { required: true, trigger: 'blur', message: '描述不能为空' }
          ]
        },
        prevFormData: '',
        prevActiveMenu: ''
      };
    },
    async created () {
      this.prevActiveMenu = this.activeMenu;

      const allTagsList = await this.getTagsList();
      this.allTagsList = allTagsList.map(tag => tag.label);

      const collectionDetails = await this.getCollectionDetails();

      this.formData = collectionDetails;

      // 用来判断用户是否编辑过
      this.prevFormData = JSON.stringify({
        url: collectionDetails.url,
        title: collectionDetails.title,
        tags: collectionDetails.tags,
        abstract: collectionDetails.abstract
      });
    },
    mounted () {

    },
    beforeRouteLeave (to, from, next) {
      // 离开时做保存提示，通过比较内容是否更改，判断是否弹出提示框
      if (this.contentStringify(this.formData) === this.prevFormData) {
        next();
        return;
      }
      this.$alert.warning('客官，您不打算保存了吗？').then((confirm) => {
        if (confirm) {
          next();
        } else {
        // 保持当前菜单处于激活状态
          this.setActiveMenu(this.prevActiveMenu);
        }
      });
    },
    computed: {
      ...mapState([
        'activeMenu'
      ])
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': ACTIVE_MENU
      }),

      getTagsList () {
        return this.$http({
          url: '/tags',
          hasWarning: true
        });
      },
      getCollectionDetails () {
        // todo 这里可以优化，直接通过路由来传递参数就行，不用再发一次请求
        return this.$http({
          url: '/collection/' + this.$route.params.id,
          method: 'get',
          hasWarning: true
        });
      },
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
                label: inputValue,
                createTime: dayjs().format('YYYY-MM-DD HH:MM:ss')
              },
              hasWarning: true,
              showSuccessMsg: true
            }).then(data => {
              this.allTagsList.push(inputValue);
            }, () => {});
          }
        });
      },
      change (tagName, isChecked) {
        this.$http({
          url: '/tags',
          data: {
            label: tagName,
            status: isChecked
          },
          method: 'put',
          hasWarning: true
        });
      },
      save () {

        const params = Object.assign({}, this.formData, {
          lastModifyTime: dayjs().format('YYYY-MM-DD HH:MM:ss')
        });

        this.$http({
          url: '/collection',
          method: 'put',
          hasWarning: true,
          showSuccessMsg: true,
          data: params,
          loading: true,
          loadingTarget: this.$refs.form.$el
        }).then(() => {
          this.prevFormData = this.contentStringify(this.formData);
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.save();
          }
        });
      },
      contentStringify (formData) {
        return JSON.stringify({
          url: formData.url,
          title: formData.title,
          tags: formData.tags,
          abstract: formData.abstract
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .edit-page {
    margin: 40px auto;
    .box-card {
      /*border-radius: 20px;*/
      .create-btn {
        width: 100%;
      }
    }
    .card-body {
      position: relative;
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
