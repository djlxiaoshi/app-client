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
                  <img class="component-img" :src="formData.img">
                  <el-upload
                    ref="upload"
                    class="upload-component"
                    action="http://localhost:3000/component/img/"
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

              <el-form-item label="组件类别" prop="gitlab">
                <el-radio-group v-model="formData.tag._id">
                  <el-radio :label="tag._id" v-for="(tag, index) in tagsList" :key="index">
                    {{ tag.label }}
                  </el-radio>
                </el-radio-group>
                <div>
                  <el-button type="primary" size="mini" plain @click="openCreateTagDialog">增加类别</el-button>
                </div>
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
          img: '',
          tag: {}
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
        },
        prevFormData: ''
      };
    },
    mounted () {
      this.getComponentDetails().then((res) => {

        // fixme 如果没有标签，连表查询的tag属性为null,那么标签field绑定的formData.tag.Z_id就会报错。
        if (!res.tag) {
          res.tag = {
            _id: ''
          };
        }

        this.formData = res;
        this.prevFormData = this.contentStringify(this.formData);
      });

      this.getTagsList();
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
        }
      });
    },
    methods: {
      getBindModel () {
        return this.formData.tag ? this.formData.tag._id : null;
      },
      getComponentDetails () {
        // todo 这里可以优化，直接通过路由来传递参数就行，不用再发一次请求
        return this.$http({
          url: '/component/' + this.$route.params.id,
          method: 'get',
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
        this.$router.push('/component-system/ViewComponent/' + id);
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
