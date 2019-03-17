<template>
  <div class="edit-page">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            编辑组件信息
          </div>
          <div class="card-body">
            <el-form
              :rules="rules"
              ref="form"
              :model="formData"
              label-width="150px"
              label-position="left">

              <el-form-item label="组件图片" prop="url">
                <div class="img-field">
                  <div class="img-wrap">
                    <img v-if="formData.img" class="component-img" :src="getImgAddress(formData.img)">
                  </div>

                  <el-upload
                    ref="upload"
                    class="upload-component"
                    :action="$globalConfig.SERVER_ADDRESS + '/component/img/'"
                    :data="{componentId: formData._id}"
                    list-type="text"
                    :with-credentials="true"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess">
                    <p class="support-desc">支持 jpg、png 格式大小 5M 以内的图片</p>
                    <el-button class="upload-avatar-btn" size="small">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="组件中文名称" prop="chineseName">
                <el-input v-model="formData.chineseName"></el-input>
              </el-form-item>

              <el-form-item label="组件英文名称" prop="englishName">
                <el-input v-model="formData.englishName"></el-input>
              </el-form-item>

              <el-form-item label="安装依赖说明" prop="dependencies">
                <el-input
                  v-model="formData.dependencies"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容">
                </el-input>
              </el-form-item>

              <el-form-item label="使用说明" prop="usage">
                <el-input v-model="formData.usage"></el-input>
              </el-form-item>

              <el-form-item label="组件类别">
                <el-radio-group v-model="formData.tag">
                  <el-radio :label="tag._id" v-for="(tag, index) in tagsList" :key="index">
                    {{ tag.label }}
                  </el-radio>
                </el-radio-group>
                <div>
                  <el-button type="primary" size="mini" plain @click="openCreateTagDialog">增加类别</el-button>
                </div>
              </el-form-item>

              <el-form-item label="预览地址" prop="previewUrl">
                <el-input v-model="formData.previewUrl"></el-input>
              </el-form-item>

              <el-form-item label="Gitlab地址" prop="gitlab">
                <el-input v-model="formData.gitlab"></el-input>
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
    </el-row>

  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import routerNameConfig from '../../router/config';

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
          chineseName: '',
          englishName: '',
          dependencies: '',
          gitlab: '',
          previewUrl: '',
          usage: '',
          img: '',
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
          usage: [
            { required: true, trigger: 'blur', message: '使用说明不能为空' }
          ],
          gitlab: [
            { required: true, trigger: 'blur', message: 'Gitlab地址不能为空' },
            { trigger: 'blur', validator: checkUrl }
          ],
          previewUrl: [
            { required: true, trigger: 'blur', message: '预览地址不能为空' },
            { trigger: 'blur', validator: checkUrl }
          ]
        },
        prevFormData: '',
        prevActiveMenu: ''
      };
    },
    mounted () {
      this.getComponentDetails().then((res) => {

        this.formData = res;
        this.prevFormData = this.contentStringify(this.formData);
        // 记录原来选中的菜单选项
        this.prevActiveMenu = this.activeMenu;
      });

      this.getTagsList();
    },
    beforeRouteLeave (to, from, next) {
      // 离开时做保存提示，通过比较内容是否更改，判断是否弹出提示框
      if (this.contentStringify(this.formData) === this.prevFormData) {
        next();
        return;
      }
      this.$alert.warning('客官，您不打算保存了吗？', {
        buttons: ['再想一下', '放弃']
      }).then((confirm) => {
        if (confirm) {
          next();
        } else {
          // 保持原来菜单的选中状态
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
      // 获取组件详细信息
      getComponentDetails () {
        // todo 这里可以优化，直接通过路由来传递参数就行，不用再发一次请求
        return this.$http({
          url: '/component/' + this.$route.params.id,
          method: 'get',
          data: {
            operate: {
              $lookup: false // 是否需要连表查询
            }
          },
          hasWarning: true
        });
      },
      // 获取tag列表
      getTagsList () {
        this.$http({
          url: '/tags/',
          method: 'get',
          hasWarning: true
        }).then(res => {
          this.tagsList = res;
        });
      },
      // 打开增加tag 弹窗
      openCreateTagDialog () {
        this.$alert.input({
          title: '新建标签',
          text: '请输入类别名'
        }).then(inputValue => {
          if (inputValue && (inputValue.trim() !== '')) {
            this.createTag(inputValue).then(() => {
              this.getTagsList();
            });
          }
        });
      },
      // 增加tag
      createTag (tagName) {
        return this.$http({
          url: '/tag',
          method: 'post',
          data: {
            label: tagName.trim(),
            createTime: dayjs().format('YYYY-MM-DD HH:MM:ss')
          },
          hasWarning: true,
          showSuccessMsg: true
        });
      },
      goToComponentDetailsPage (id) {
        this.$router.push({ name: routerNameConfig.ViewComponentRouterName, params: { id } });
      },
      update () {
        const componentId = this.$route.params.id;
        this.$http({
          url: '/component/' + componentId,
          method: 'put',
          hasWarning: true,
          showSuccessMsg: true,
          data: this.formData
        }).then(() => {
          this.prevFormData = this.contentStringify(this.formData);
          this.goToComponentDetailsPage(componentId);
        });
      },
      formValidate () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.update();
          }
        });
      },
      // 上传图片前的校验工作
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 < 300;

        if (!(isJPG || isPNG)) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 300KB!');
        }
        return (isJPG || isPNG) && isLt2M;
      },
      handleSuccess (res) {
        this.$set(this.formData, 'img', res.data.path);
        this.$notify.success('上传成功');
      },
      getImgAddress (imgPath) {
        return this.$globalConfig.SERVER_ADDRESS + imgPath;
      },
      contentStringify (formData) {
        return JSON.stringify({
          chineseName: formData.chineseName,
          englishName: formData.englishName,
          dependencies: formData.dependencies,
          gitlab: formData.gitlab,
          tag: formData.tag
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
      .img-field {
        display: flex;
        align-items: flex-end;
        .img-wrap {
          width: 100px;
          height: 100px;
          margin-right: 20px;
          border: 1px solid #e5e5e5;
        }
      }
      /deep/ .el-textarea {
        textarea {
          font-family: '微软雅黑';
        }
      }
      .component-img {
        margin-right: 20px;
        height: 100px;
        width: 100px;
        border: 1px solid #e5e5e5;
      }
      .upload-component {
        /deep/ .el-upload {
          text-align: left;
        }
      }
    }
  }
</style>
