<template>
    <div class="user-info-page">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="main-container">
          <div class="user-info-panel">
            <el-form
              ref="form"
              :rules="rules"
              :model="user"
              label-width="80px"
              label-position="left">
              <el-form-item label="头像" prop="url">
                <img class="user-avatar avatar-left" :src="user.avatar" alt="">
                <div class="avatar-right">
                  <el-upload
                    ref="upload"
                    class="upload-avatar-input"
                    :action="$globalConfig.SERVER_ADDRESS + '/user/avatar/'"
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

              <el-form-item label="用户名" prop="username" class="username-input-item">
                <el-input v-model="user.username" v-if="isEditStatus"></el-input>
                <p v-else>{{ user.username }}</p>
              </el-form-item>

              <el-form-item label="用户邮箱" prop="email" class="username-input-item">
                <el-input v-model="user.email" v-if="isEditStatus"></el-input>
                <p v-else>{{ user.email }}</p>
              </el-form-item>

              <el-form-item label="个人介绍" class="user-info-input-item">
                <el-input
                  v-if="isEditStatus"
                  type="textarea"
                  :rows="2"
                  v-model="user.info"
                >
                </el-input>
                <p v-else>{{ user.info }}</p>
              </el-form-item>

              <el-form-item label="">
                <el-button @click="toggleEditStatus" type="primary" size="small" plain>编辑</el-button>
                <el-button @click="save" type="success" size="small" plain>保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { SET_USER_MSG } from 'store/mutation-types';

    export default {
        data () {
          const checkEmail = (rule, value, callback) => {

            value = value.trim();
            const regexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!regexp.test(value)) {
              callback(new Error('请输入正确的邮箱地址'));
            } else {
              callback();
            }
          };

          return {
            user: {
              email: '',
              username: '',
              info: ''
            },
            isEditStatus: false,
            rules: {
              username: [
                { required: true, trigger: 'blur', message: '请输入用户名' }
              ],
              email: [
                { required: true, trigger: 'blur', message: '请输入邮箱' },
                { trigger: 'blur', validator: checkEmail }
              ]
            },
            inputStatus: {
              usernameDisabled: true,
              infoDisabled: true
            }
          };
        },
      created () {
        const { xhrInstance } = this.$http({
          url: '/user',
          method: 'get',
          showErrorMsg: true
        });

        xhrInstance.then((user) => {
          this.user = user;
        }, () => {});
      },
      methods: {
        ...mapMutations({
          'setUserMsg': SET_USER_MSG
        }),
        handleSuccess (res) {
          // 由于七牛云采用的同名覆盖，覆盖上传后，路径不会变化，所以在这里用时间戳进行强制刷新
          this.$set(this.user, 'avatar', res.data.path + '?v=' + new Date().getTime());
          // 更新vuex 中用户信息
          this.setUserMsg(this.user);
          this.$notify.success('上传成功');
        },
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
        toggleEditStatus () {
          this.isEditStatus = true;
        },
        save () {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.updateUserInfo().then(user => {

                // 更新vuex store中用户信息
                this.setUserMsg(Object.assign(this.user, user));
                // 重置状态
                this.resetStatus();
              });
            }
          });
        },
        // 更新用户信息
        updateUserInfo () {

          const { xhrInstance } = this.$http({
            url: '/user',
            method: 'put',
            data: {
              info: this.user.info,
              username: this.user.username,
              email: this.user.email
            },
            showErrorMsg: true,
            showSuccessMsg: true
          });

          return xhrInstance;
        },
        resetStatus () {
          this.isEditStatus = false;
        }
      }
    };
</script>

<style scoped lang="less">
  .user-info-page {
    .user-info-panel {
      margin: 20px auto;
      padding: 20px 50px;
      width: 500px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      /deep/ .el-upload {
        text-align: left;
      }
      .avatar-left, .avatar-right{
        display: inline-block;
        vertical-align: middle;
      }
      .avatar-left {
        margin-right: 20px;
      }
      .user-avatar {
        width: 80px;
        height: 80px;
        border: 1px solid #e5e5e5;
      }
      .avatar-right {
        .support-desc {
          color: #909090;
          font-size: 12px;
        }
        .upload-avatar-btn {

        }
      }
      .username-input-item {
        /deep/ .el-input {
          width: 80%;
        }
      }
      .user-info-input-item {
        /deep/ .el-textarea {
          width: 80%;
          textarea {
            font-family: 'Arial';
          }
        }
      }
    }
  }
</style>
